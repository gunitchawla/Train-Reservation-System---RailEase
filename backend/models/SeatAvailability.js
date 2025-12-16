const mongoose = require('mongoose');

const seatAvailabilitySchema = new mongoose.Schema({
    trainNumber: { type: String, required: true, ref: 'Train' },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    segments: {
        type: Map,
        of: {
            '1A': { type: Number, default: 10 },
            '2A': { type: Number, default: 40 },
            '3A': { type: Number, default: 60 },
            'SL': { type: Number, default: 120 }
        }, // Key: "Source-Dest", Value: { '1A': ..., '2A': ... }
    },
}, { timestamps: true });

// Compound index to ensure unique availability per train per date
seatAvailabilitySchema.index({ trainNumber: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('SeatAvailability', seatAvailabilitySchema);
