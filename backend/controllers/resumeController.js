const { extractTextFromPDF } = require("../utils/pdfParser");
const { analyzeWithGemini } = require("../services/geminiService");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

exports.uploadResume = upload.single("resume");

exports.analyzeResume = async (req, res) => {
  try {
    // Debug: log incoming file and body
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const file = req.file;
    const jobDescription = req.body && typeof req.body.jobDescription === "string" ? req.body.jobDescription : "";

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract text from PDF (or DOCX if you support it)
    const resumeText = await extractTextFromPDF(file.path);

    // Real-time Gemini analysis (returns full structured report)
    const analysis = await analyzeWithGemini(resumeText, jobDescription);

    res.status(200).json({
      success: true,
      analysis, // This is the full report for the frontend
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message, error.stack);
    res.status(500).json({ error: error.message || "Failed to analyze resume. Please try again." });
  }
};
