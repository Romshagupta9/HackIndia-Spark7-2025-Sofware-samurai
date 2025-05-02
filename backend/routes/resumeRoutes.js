const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { analyzeResume } = require("../controllers/resumeController");
const auth = require("../middlewares/authMiddleware");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/upload", auth, upload.single("resume"), analyzeResume);
router.get("/upload", (req, res) => {
  res.status(200).json({ message: "GET /api/resume/upload is working!" });
});
router.post("/analyze", auth, upload.single("resume"), analyzeResume);

module.exports = router;
