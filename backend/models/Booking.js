const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainNumber: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: String, required: true },
    seatsBooked: { type: Number, required: true, default: 1 },
    status: { type: String, enum: ['CONFIRMED', 'CANCELLED', 'WAITLISTED'], default: 'CONFIRMED' },
    paymentStatus: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    transactionId: { type: String },
    classType: { type: String, required: true, enum: ['1A', '2A', '3A', 'SL'] },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
