const { extractTextFromPDF } = require("../utils/pdfParser");
const { analyzeWithGemini } = require("../services/geminiService");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

exports.uploadResume = upload.single("resume");

exports.analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    // Validate file and job description
    if (!req.file) {
      console.error("Resume file is missing in the request.");
      return res.status(400).json({ error: "Resume file is required." });
    }
    if (!jobDescription) {
      console.error("Job description is missing in the request.");
      return res.status(400).json({ error: "Job description is required." });
    }

    console.log("Request file:", req.file);
    console.log("Request body:", req.body);

    // Extract text from the uploaded PDF
    const resumeText = await extractTextFromPDF(req.file.path);

    // Analyze the resume using Gemini
    const analysis = await analyzeWithGemini(resumeText, jobDescription);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);
    res.status(500).json({ error: "Failed to analyze resume. Please try again." });
  }
};
