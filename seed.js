const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./backend/models/Train');

dotenv.config({ path: './backend/.env' });

const seedTrains = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await Train.deleteMany();
        console.log('Old trains removed');

        const trains = [
            {
                trainNumber: '12002',
                trainName: 'Bhopal Shatabdi',
                totalSeats: 500,
                stations: [
                    { name: 'Delhi', arrival: '06:00', departure: '06:15', day: 1 },
                    { name: 'Mathura', arrival: '07:30', departure: '07:35', day: 1 },
                    { name: 'Agra', arrival: '08:10', departure: '08:15', day: 1 },
                    { name: 'Gwalior', arrival: '09:30', departure: '09:35', day: 1 },
                    { name: 'Bhopal', arrival: '14:00', departure: '14:00', day: 1 }
                ]
            },
            {
                trainNumber: '12951',
                trainName: 'Mumbai Rajdhani',
                totalSeats: 400,
                stations: [
                    { name: 'Mumbai', arrival: '17:00', departure: '17:00', day: 1 },
                    { name: 'Surat', arrival: '19:30', departure: '19:35', day: 1 },
                    { name: 'Vadodara', arrival: '21:10', departure: '21:20', day: 1 },
                    { name: 'Kota', arrival: '03:00', departure: '03:10', day: 2 },
                    { name: 'Delhi', arrival: '08:30', departure: '08:30', day: 2 }
                ]
            },
            {
                trainNumber: '14012',
                trainName: 'Rohtak Express',
                totalSeats: 300,
                stations: [
                    { name: 'Delhi', arrival: '10:00', departure: '10:15', day: 1 },
                    { name: 'Bahadurgarh', arrival: '11:00', departure: '11:05', day: 1 },
                    { name: 'Rohtak', arrival: '12:00', departure: '12:00', day: 1 }
                ]
            }
        ];

        await Train.insertMany(trains);
        console.log('Trains Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedTrains();
