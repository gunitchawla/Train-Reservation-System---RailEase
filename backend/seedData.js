const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./models/Train');
const SeatAvailability = require('./models/SeatAvailability');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const trains = [
    {
        trainNumber: "12004",
        trainName: "Lucknow Swarna Shatabdi",
        stations: ["New Delhi", "Ghaziabad", "Aligarh", "Tundla", "Etawah", "Kanpur Central", "Lucknow"],
        totalSeats: 70
    },
    {
        trainNumber: "12424",
        trainName: "Dibrugarh Rajdhani Express",
        stations: ["New Delhi", "Kanpur Central", "Prayagraj", "Patna", "Barauni", "NJP", "Guwahati", "Dibrugarh"],
        totalSeats: 120
    },
    {
        trainNumber: "12056",
        trainName: "Dehradun Jan Shatabdi",
        stations: ["New Delhi", "Ghaziabad", "Meerut City", "Muzaffarnagar", "Deoband", "Tapri", "Roorkee", "Haridwar", "Dehradun"],
        totalSeats: 90
    },
    {
        trainNumber: "12951",
        trainName: "Mumbai Rajdhani",
        stations: ["Mumbai Central", "Surat", "Vadodara", "Ratlam", "Kota", "New Delhi"],
        totalSeats: 150
    },
    {
        trainNumber: "22436",
        trainName: "Vande Bharat Express",
        stations: ["New Delhi", "Kanpur Central", "Prayagraj", "Varanasi"],
        totalSeats: 100
    }
];

const seedData = async () => {
    try {
        await Train.deleteMany();
        await SeatAvailability.deleteMany();

        await Train.insertMany(trains);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
