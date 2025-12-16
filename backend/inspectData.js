const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require('./models/Train');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const inspectData = async () => {
    try {
        const count = await Train.countDocuments();
        console.log(`Total Trains: ${count}`);

        const sample = await Train.findOne();
        console.log('Sample Train:', JSON.stringify(sample, null, 2));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

inspectData();
