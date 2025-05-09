// backend/controllers/chatbotController.js
const { chatWithGeminiBot } = require("../services/chatbotService");

exports.chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await chatWithGeminiBot(message);
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot controller error:", error);
    res.status(500).json({ error: "Something went wrong with chatbot" });
  }
};
