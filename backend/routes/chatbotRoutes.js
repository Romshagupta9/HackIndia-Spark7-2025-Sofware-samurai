// backend/routes/chatbotRoutes.js
const express = require("express");
const router = express.Router();
const { chatbotReply } = require("../controllers/chatbotController");

router.post("/ask", chatbotReply); // POST /api/chatbot/ask

module.exports = router;
