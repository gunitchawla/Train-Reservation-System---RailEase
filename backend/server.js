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
            },
            {
                trainNumber: '12055',
                trainName: 'Dehradun Jan Shatabdi',
                totalSeats: 450,
                stations: [
                    { name: 'Delhi', arrival: '15:20', departure: '15:20', day: 1 },
                    { name: 'Meerut', arrival: '16:40', departure: '16:42', day: 1 },
                    { name: 'Dehradun', arrival: '21:10', departure: '21:10', day: 1 }
                ]
            },
            {
                trainNumber: '12424',
                trainName: 'Dibrugarh Rajdhani',
                totalSeats: 500,
                stations: [
                    { name: 'Delhi', arrival: '16:20', departure: '16:20', day: 1 },
                    { name: 'Kanpur', arrival: '21:05', departure: '21:10', day: 1 },
                    { name: 'Prayagraj', arrival: '23:00', departure: '23:02', day: 1 },
                    { name: 'Patna', arrival: '04:00', departure: '04:10', day: 2 }
                ]
            },
            {
                trainNumber: '12260',
                trainName: 'Sealdah Duronto',
                totalSeats: 600,
                stations: [
                    { name: 'Delhi', arrival: '19:45', departure: '19:45', day: 1 },
                    { name: 'Kanpur', arrival: '00:30', departure: '00:35', day: 2 },
                    { name: 'Sealdah', arrival: '12:30', departure: '12:30', day: 2 }
                ]
            },
            {
                trainNumber: '12626',
                trainName: 'Kerala Express',
                totalSeats: 700,
                stations: [
                    { name: 'Delhi', arrival: '20:10', departure: '20:10', day: 1 },
                    { name: 'Agra', arrival: '22:50', departure: '22:55', day: 1 },
                    { name: 'Bhopal', arrival: '05:55', departure: '06:00', day: 2 },
                    { name: 'Nagpur', arrival: '12:30', departure: '12:35', day: 2 },
                    { name: 'Trivandrum', arrival: '14:30', departure: '14:30', day: 3 }
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
