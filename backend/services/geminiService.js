const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeWithGemini = async (resumeText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `
You are a career counselor AI.

Given this resume text:

"${resumeText}"

Please respond in JSON format like this:
{
  "analysis": "Short summary about the resume",
  "extractedSkills": ["skill1", "skill2", ...],
  "skillGaps": ["missing_skill1", "missing_skill2", ...]
}

Only return JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // ✅ Clean markdown syntax like json ... 
    text = text.trim();
    if (text.startsWith("")) {
      text = text.replace(/(?:json)?/g, "").replace(/```/g, "").trim();
    }

    const parsed = JSON.parse(text);
    return parsed;

  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Gemini API error");
  }
};
