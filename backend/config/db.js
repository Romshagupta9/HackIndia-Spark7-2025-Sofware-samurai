const mongoose = require('mongoose');
require('dotenv').config();  // Ensure to load environment variables from .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);  // Exit the process with a failure code
    }
};

module.exports = connectDB;
