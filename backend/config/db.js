const mongoose = require('mongoose');
require('dotenv').config();  // Ensure to load environment variables from .env file

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process with a failure code
    }
};

module.exports = connectDB;
