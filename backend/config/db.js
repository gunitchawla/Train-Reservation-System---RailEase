const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB...`);
    // Log the URI partially to verify it's being read (masking password)
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/railease';
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log(`Using URI: ${maskedUri}`);

    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Full Error Details:`, error);
    process.exit(1);
  }
};

module.exports = connectDB;
