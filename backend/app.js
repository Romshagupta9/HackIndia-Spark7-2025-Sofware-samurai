const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:8081", // your frontend's port
    credentials: true
  }));

// Middleware

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
