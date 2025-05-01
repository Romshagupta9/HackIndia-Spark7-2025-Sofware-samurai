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