const { extractTextFromPDF } = require("../utils/pdfParser");
const { analyzeWithGemini } = require("../services/geminiService");
const Resume = require("../models/Resume");

exports.analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const resumeText = await extractTextFromPDF(file.path);
    const { analysis, extractedSkills, skillGaps } = await analyzeWithGemini(resumeText);

    const newResume = new Resume({
      userId: req.user.id,
      filePath: file.path,
      analysis,
      extractedSkills,
      skillGaps,
    });

    await newResume.save();

    res.status(200).json({
      success: true,
      analysis,
      extractedSkills,
      skillGaps,
      resumeId: newResume._id,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);
    res.status(500).json({ error: "Something went wrong while analyzing resume" });
  }
};