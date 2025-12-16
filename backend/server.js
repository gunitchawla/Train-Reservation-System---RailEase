const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: '*', // Allow all origins for dev simplicity
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const Train = require('./models/Train');
app.get('/api/seed', async (req, res) => {
    try {
        await Train.deleteMany();
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
        res.send('Database Seeded Successfully!');
    } catch (error) {
        res.status(500).send('Seeding Failed: ' + error.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
