const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true, unique: true },
    trainName: { type: String, required: true },
    stations: [{
        name: { type: String, required: true },
        arrival: { type: String, default: '00:00' },
        departure: { type: String, default: '00:00' },
        day: { type: Number, default: 1 }
    }],
    totalSeats: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);
