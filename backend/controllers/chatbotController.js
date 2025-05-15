// backend/controllers/chatbotController.js
const { chatWithGeminiBot } = require("../services/chatbotService");

exports.chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      console.error("Missing 'message' field in request body");
      return res.status(400).json({ error: "The 'message' field is required in the request body." });
    }

    const reply = await chatWithGeminiBot(message);
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot controller error:", error);
    res.status(500).json({ error: "Something went wrong with chatbot" });
  }
};
