const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
  },
  extractedSkills: [String],  
  skillGaps: [String],        
});

module.exports = mongoose.model("Resume", ResumeSchema);
///Resume.js
// This code defines a Mongoose schema for a Resume model. The schema includes fields for user ID, file path, analysis, extracted skills, and skill gaps. The model is then exported for use in other parts of the application.