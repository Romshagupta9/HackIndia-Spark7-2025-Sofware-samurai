const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // Import multer

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const jobTrendsRoutes = require('./routes/jobTrendsRoutes'); // Import job trends routes

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:8081"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api', jobTrendsRoutes); // <-- Make sure this is AFTER the above

// Database Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
