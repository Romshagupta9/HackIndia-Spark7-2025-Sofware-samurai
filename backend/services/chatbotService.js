// backend/services/chatbotService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithGeminiBot = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `You are "Saaarthi", a helpful, kind, and skilled career counselor chatbot created for Indian students.
You suggest trending skills, career options, emotional guidance, and job market insights in a simple and empathetic tone.
If the user is confused, encourage them. If they mention a technology or skill, guide them with practical steps.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Gemini chatbot error:", error);
    throw new Error("Gemini chatbot error");
  }
};
////  chatbotService.js