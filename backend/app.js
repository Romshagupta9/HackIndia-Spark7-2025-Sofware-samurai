const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require("./routes/resumeRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use("/api/resume", resumeRoutes);
app.use("/api/chatbot", chatbotRoutes);




// Database Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
