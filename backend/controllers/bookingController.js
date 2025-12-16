const Booking = require('../models/Booking');
const Train = require('../models/Train');
const SeatAvailability = require('../models/SeatAvailability');
const mongoose = require('mongoose');

// @desc    Book a ticket
// @route   POST /api/bookings
// @access  Private
const bookTicket = async (req, res) => {
    const { trainNumber, from, to, date, transactionId, classType } = req.body;
    console.log('Booking Request:', { trainNumber, from, to, date, transactionId, classType });
    const userId = req.user._id;

    const fromStation = from.toUpperCase();

    try {
        const train = await Train.findOne({ trainNumber });
        if (!train) {
            throw new Error('Train not found');
        }

        // Use regex for fuzzy matching (same as search)
        const fromRegex = new RegExp(from, 'i');
        const toRegex = new RegExp(to, 'i');

        const fromIndex = train.stations.findIndex(s => fromRegex.test(s.name));
        const toIndex = train.stations.findIndex(s => toRegex.test(s.name));

        if (fromIndex === -1 || toIndex === -1) {
            throw new Error(`Invalid route: Station not found. From: ${from} (${fromIndex}), To: ${to} (${toIndex})`);
        }

        if (fromIndex >= toIndex) {
            throw new Error('Invalid route: Destination comes before Source');
        }

        const actualFrom = train.stations[fromIndex].name;
        const actualTo = train.stations[toIndex].name;

        const segments = [];
        for (let i = fromIndex; i < toIndex; i++) {
            segments.push(`${train.stations[i].name}-${train.stations[i + 1].name}`);
        }

        // Find or create availability record
        let availability = await SeatAvailability.findOne({
            trainNumber,
            date,
        });

        if (!availability) {
            availability = new SeatAvailability({
                trainNumber,
                date,
                segments: {},
            });
        }

        // Default Capacities
        const capacities = { '1A': 24, '2A': 48, '3A': 64, 'SL': 72 };

        let bookingStatus = 'CONFIRMED';

        // Check availability for all segments first
        for (const segment of segments) {
            let segmentSeats = availability.segments.get(segment);

            // Initialize if not exists
            if (!segmentSeats) {
                segmentSeats = { '1A': capacities['1A'], '2A': capacities['2A'], '3A': capacities['3A'], 'SL': capacities['SL'] };
            } else if (typeof segmentSeats.get === 'function') {
                segmentSeats = segmentSeats.toObject ? segmentSeats.toObject() : segmentSeats;
            }

            // Check specific class availability
            if (segmentSeats[classType] <= 0) {
                bookingStatus = 'WAITLISTED';
            }
        }

        // If CONFIRMED, decrement seats
        if (bookingStatus === 'CONFIRMED') {
            for (const segment of segments) {
                let segmentSeats = availability.segments.get(segment);
                if (!segmentSeats) {
                    segmentSeats = { '1A': capacities['1A'], '2A': capacities['2A'], '3A': capacities['3A'], 'SL': capacities['SL'] };
                } else if (typeof segmentSeats.get === 'function') {
                    segmentSeats = segmentSeats.toObject ? segmentSeats.toObject() : segmentSeats;
                }

                segmentSeats[classType] -= 1;
                availability.segments.set(segment, segmentSeats);
            }
            await availability.save();
        }

        const booking = new Booking({
            bookingId: 'BK' + Date.now() + Math.floor(Math.random() * 1000),
            user: userId,
            trainNumber,
            from: actualFrom,
            to: actualTo,
            date,
            seatsBooked: 1,
            paymentStatus: 'PAID',
            transactionId: transactionId || 'TXN' + Date.now(),
            classType,
            status: bookingStatus
        });

        await booking.save();

        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking Error:', error); // Log the full error
        res.status(400).json({ message: error.message, stack: error.stack }); // Send detailed error to frontend
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel a ticket
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelTicket = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            throw new Error('Booking not found');
        }

        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new Error('Not authorized');
        }

        if (booking.status === 'CANCELLED') {
            throw new Error('Booking already cancelled');
        }

        const train = await Train.findOne({ trainNumber: booking.trainNumber });
        const fromIndex = train.stations.findIndex(s => s.name === booking.from);
        const toIndex = train.stations.findIndex(s => s.name === booking.to);

        const segments = [];
        for (let i = fromIndex; i < toIndex; i++) {
            segments.push(`${train.stations[i].name}-${train.stations[i + 1].name}`);
        }

        // Find availability record
        const availability = await SeatAvailability.findOne({
            trainNumber: booking.trainNumber,
            date: booking.date,
        });

        if (availability) {
            for (const segment of segments) {
                let segmentSeats = availability.segments.get(segment);
                if (segmentSeats) {
                    // Ensure it's an object
                    segmentSeats = segmentSeats.toObject ? segmentSeats.toObject() : segmentSeats;

                    // Increment specific class ONLY if it was a CONFIRMED booking
                    // If it was WAITLISTED, we don't increment available seats (since none were consumed)
                    if (booking.status === 'CONFIRMED') {
                        if (booking.classType && segmentSeats[booking.classType] !== undefined) {
                            segmentSeats[booking.classType] += booking.seatsBooked;
                        } else {
                            // Fallback for old bookings
                            if (!segmentSeats['SL']) segmentSeats['SL'] = 0;
                            segmentSeats['SL'] += booking.seatsBooked;
                        }
                        availability.segments.set(segment, segmentSeats);
                    }
                }
            }
            if (booking.status === 'CONFIRMED') {
                await availability.save();
            }
        }

        booking.status = 'CANCELLED';
        await booking.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Cancellation Error:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { bookTicket, getUserBookings, getAllBookings, cancelTicket };
