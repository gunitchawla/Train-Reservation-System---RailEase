const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const Train = require('./models/Train');
const SeatAvailability = require('./models/SeatAvailability');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedRealData = async () => {
    console.log('Starting Real Data Seed...');
    console.log('Fetching schedules.json (this may take a moment)...');

    const trainMap = new Map();

    try {
        const response = await axios({
            method: 'get',
            url: 'https://raw.githubusercontent.com/datameet/railways/master/schedules.json',
            responseType: 'stream'
        });

        response.data
            .pipe(JSONStream.parse('*'))
            .pipe(es.mapSync(function (data) {
                // Filter for valid data
                if (!data.train_number || !data.station_name) return;

                if (!trainMap.has(data.train_number)) {
                    trainMap.set(data.train_number, {
                        trainNumber: data.train_number.toString(),
                        trainName: data.train_name,
                        stations: []
                    });
                }

                const train = trainMap.get(data.train_number);
                train.stations.push({
                    name: data.station_name,
                    code: data.station_code,
                    arrival: data.arrival,
                    departure: data.departure,
                    day: data.day || 1
                });

                return data;
            }))
            .on('error', function (err) {
                console.error('Error parsing JSON:', err);
            })
            .on('end', async function () {
                console.log(`Processed stream. Found ${trainMap.size} unique trains.`);
                console.log('Sorting stations and preparing for insert...');

                const trainsToInsert = [];
                const availabilityToInsert = [];

                // Process each train
                for (const [trainNum, trainData] of trainMap) {
                    // Sort stations by day and time
                    trainData.stations.sort((a, b) => {
                        if (a.day !== b.day) return a.day - b.day;
                        const timeA = a.departure === "None" ? a.arrival : a.departure;
                        const timeB = b.departure === "None" ? b.arrival : b.departure;
                        return (timeA || "").localeCompare(timeB || "");
                    });

                    // Only add trains with at least 2 stations and a valid name
                    if (trainData.stations.length < 2 || !trainData.trainName) {
                        continue;
                    }

                    // Create Train Object
                    trainsToInsert.push({
                        trainNumber: trainData.trainNumber,
                        trainName: trainData.trainName || `Train ${trainData.trainNumber}`,
                        stations: trainData.stations.map(s => ({
                            name: s.name,
                            arrival: s.arrival === "None" ? s.departure : s.arrival,
                            departure: s.departure === "None" ? s.arrival : s.departure,
                            day: s.day
                        })),
                        totalSeats: 120 // Default capacity
                    });

                    // Create Availability Object (for today)
                    // We won't create availability for ALL trains to save space, maybe just top 100?
                    // Or we can create it on the fly. 
                    // Let's create for the first 500 to ensure search works immediately.
                    if (trainsToInsert.length <= 500) {
                        // ... logic to create segments ...
                        // Actually, let's just insert trains. The search logic checks availability.
                        // If availability doc is missing, my code currently assumes "totalSeats".
                        // Wait, let's check `trainController.js`.
                        // "const segmentSeats = seats !== undefined ? seats : train.totalSeats;"
                        // Yes! If availability doc is missing, it defaults to FULL AVAILABILITY.
                        // So I don't need to insert SeatAvailability docs!
                    }
                }

                console.log(`Filtered down to ${trainsToInsert.length} valid trains.`);

                // Batch insert to avoid timeout
                const BATCH_SIZE = 500;
                await Train.deleteMany({});
                await SeatAvailability.deleteMany({}); // Clear old availability

                console.log('Inserting into MongoDB...');
                for (let i = 0; i < trainsToInsert.length; i += BATCH_SIZE) {
                    const batch = trainsToInsert.slice(i, i + BATCH_SIZE);
                    await Train.insertMany(batch);
                    console.log(`Inserted ${Math.min(i + BATCH_SIZE, trainsToInsert.length)} / ${trainsToInsert.length}`);
                }

                console.log('Real Data Seed Completed Successfully!');
                process.exit();
            });

    } catch (error) {
        console.error('Error fetching data:', error);
        process.exit(1);
    }
};

seedRealData();
