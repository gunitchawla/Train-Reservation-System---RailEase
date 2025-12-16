const Train = require('../models/Train');
const SeatAvailability = require('../models/SeatAvailability');

// @desc    Add a new train
// @route   POST /api/trains
// @access  Private/Admin
const addTrain = async (req, res) => {
    const { trainNumber, trainName, stations, totalSeats } = req.body;

    try {
        const train = new Train({
            trainNumber,
            trainName,
            stations,
            totalSeats,
        });

        const createdTrain = await train.save();
        res.status(201).json(createdTrain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Search trains
// @route   GET /api/trains/search
// @access  Public
const searchTrains = async (req, res) => {
    const { from, to, date } = req.query;
    console.log(`Search Request: From '${from}' To '${to}' Date '${date}'`);

    if (!from || !to || !date) {
        return res.status(400).json({ message: 'Please provide from, to, and date' });
    }

    try {
        // Escape special regex characters to prevent errors
        const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        const fromRegex = new RegExp(escapeRegex(from), 'i');
        const toRegex = new RegExp(escapeRegex(to), 'i');

        // 1. Find trains that have stations matching both queries
        const trains = await Train.find({
            'stations.name': { $all: [fromRegex, toRegex] },
        });

        console.log(`Found ${trains.length} potential trains`);

        const availableTrains = [];

        for (const train of trains) {
            // Find the specific station index that matched
            const fromIndex = train.stations.findIndex(s => fromRegex.test(s.name));
            const toIndex = train.stations.findIndex(s => toRegex.test(s.name));

            // 2. Ensure 'from' comes before 'to' in the stations array
            if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
                // Calculate segments
                const segments = [];
                for (let i = fromIndex; i < toIndex; i++) {
                    segments.push(`${train.stations[i].name}-${train.stations[i + 1].name}`);
                }

                // Check availability
                let availability = await SeatAvailability.findOne({
                    trainNumber: train.trainNumber,
                    date: date,
                });

                // Default Capacities
                const capacities = { '1A': 24, '2A': 48, '3A': 64, 'SL': 72 };
                const prices = {};

                // Calculate base price based on duration (approx distance)
                const durationParts = calculateDuration(train.stations[fromIndex].departure, train.stations[toIndex].arrival, train.stations[fromIndex].day, train.stations[toIndex].day).split(' ');
                const hours = parseInt(durationParts[0]) || 0;
                const basePrice = Math.max(100, hours * 50); // ₹50 per hour approx

                prices['SL'] = Math.floor(basePrice);
                prices['3A'] = Math.floor(basePrice * 2.5);
                prices['2A'] = Math.floor(basePrice * 3.5);
                prices['1A'] = Math.floor(basePrice * 5.5);

                const classAvailability = { '1A': capacities['1A'], '2A': capacities['2A'], '3A': capacities['3A'], 'SL': capacities['SL'] };

                if (availability) {
                    for (const segment of segments) {
                        const segmentSeats = availability.segments.get(segment);
                        if (segmentSeats) {
                            for (const cls of ['1A', '2A', '3A', 'SL']) {
                                // If segment data exists for this class, use it, else default to capacity
                                const seats = segmentSeats[cls] !== undefined ? segmentSeats[cls] : capacities[cls];
                                if (seats < classAvailability[cls]) {
                                    classAvailability[cls] = seats;
                                }
                            }
                        }
                    }
                } else {
                    // If no availability record exists, simulate some randomness for "Real Time" feel
                    // But keep it consistent for the same request if possible (random seed?)
                    // For now, just random reduction to look realistic
                    for (const cls of ['1A', '2A', '3A', 'SL']) {
                        const randomBooked = Math.floor(Math.random() * (capacities[cls] * 0.3)); // 0-30% booked
                        classAvailability[cls] -= randomBooked;
                    }
                }

                availableTrains.push({
                    ...train._doc,
                    availability: classAvailability,
                    prices: prices,
                    departureTime: train.stations[fromIndex].departure,
                    arrivalTime: train.stations[toIndex].arrival,
                    duration: calculateDuration(train.stations[fromIndex].departure, train.stations[toIndex].arrival, train.stations[fromIndex].day, train.stations[toIndex].day)
                });
            }
        }

        console.log(`Returning ${availableTrains.length} valid trains`);
        res.json(availableTrains);
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const calculateDuration = (dep, arr, depDay, arrDay) => {
    if (!dep || !arr) return 'N/A';

    const [depH, depM] = dep.split(':').map(Number);
    const [arrH, arrM] = arr.split(':').map(Number);

    let durationM = (arrH * 60 + arrM) - (depH * 60 + depM);

    // Add days
    durationM += (arrDay - depDay) * 24 * 60;

    if (durationM < 0) durationM += 24 * 60; // Handle midnight crossing if days not reliable

    const h = Math.floor(durationM / 60);
    const m = durationM % 60;

    return `${h}h ${m}m`;
};

module.exports = { addTrain, searchTrains };
