const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('your_connection_string');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;