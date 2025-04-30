const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { analyzeResume } = require("../controllers/resumeController");
const auth = require("../middlewares/authMiddleware");

// router.post("/analyze", upload.single("resume"), analyzeResume);
router.post("/upload", auth, upload.single("resume"), analyzeResume);
router.post("/analyze", analyzeResume);

module.exports = router;
