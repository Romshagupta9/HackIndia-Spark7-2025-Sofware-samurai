// backend/routes/chatbotRoutes.js
const express = require("express");
const router = express.Router();
const { chatbotReply } = require("../controllers/chatbotController");

router.post("/ask", chatbotReply); // POST /api/chatbot/ask

module.exports = router;

///chatbotRoutes.js
// This code defines a route for handling chatbot requests. It imports the necessary modules, sets up a POST route at "/ask", and links it to the `chatbotReply` controller function. The router is then exported for use in other parts of the application.