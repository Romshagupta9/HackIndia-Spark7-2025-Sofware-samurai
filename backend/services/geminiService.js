const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const PROMPT_TEMPLATE = `
You are an AI Resume Analysis Assistant. Analyze the content of the provided resume and return structured data in the format below. Evaluate the resume quality, skill relevance, and career fit based on best practices in the tech job market. Identify strengths, weaknesses, skill match scores, experience details, education, keyword presence, and recommendations for improvement.

Use this JSON structure:
{
  "score": (number between 0-100 representing overall resume quality),
  "careerFitScore": (number between 0-100 showing career fit based on job market relevance),
  "strengths": [list of 3-5 strengths from the resume],
  "weaknesses": [list of 3-5 weaknesses in the resume],
  "skills": [
    {
      "name": "SkillName",
      "level": "expert" | "proficient" | "familiar",
      "matchScore": number between 0-100,
      "recommendation": "Optional improvement tip"
    }
  ],
  "experiences": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "duration": "YYYY - YYYY or Present",
      "highlights": ["Achievement 1", "Achievement 2"],
      "recommendation": "Optional improvement tip"
    }
  ],
  "education": [
    {
      "degree": "Degree",
      "institution": "University or School",
      "year": "Graduation Year"
    }
  ],
  "recommendations": ["List of 3-5 actionable tips to improve the resume"],
  "keywordMatches": [
    { "keyword": "React", "found": true },
    { "keyword": "CI/CD", "found": false }
  ]
}

Input Resume:
`;

exports.analyzeWithGemini = async (resumeText, jobDescription) => {
  const prompt =
    PROMPT_TEMPLATE +
    resumeText +
    (jobDescription ? `\n\nTarget Job Description:\n${jobDescription}` : "") +
    "\n\nOutput: JSON response with the above structure.";

  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Try to extract JSON from Gemini's response
  let jsonStart = text.indexOf("{");
  let jsonEnd = text.lastIndexOf("}");
  let jsonString = text;
  if (jsonStart !== -1 && jsonEnd !== -1) {
    jsonString = text.substring(jsonStart, jsonEnd + 1);
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Gemini returned invalid JSON:", text);
    throw new Error("Gemini returned invalid JSON");
  }
};
/// @desc    Analyze resume with Gemini