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
const trainsData = require('./data/trains');
app.get('/api/seed', async (req, res) => {
    try {
        await Train.deleteMany();
        await Train.insertMany(trainsData);
        res.send(`Database Seeded Successfully with ${trainsData.length} trains!`);
    } catch (error) {
        res.status(500).send('Seeding Failed: ' + error.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
