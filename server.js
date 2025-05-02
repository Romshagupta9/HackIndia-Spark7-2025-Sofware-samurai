const express = require('express');
const multer = require('multer');
const app = express();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Define the POST route for resume upload
app.post('/api/resume/upload', upload.single('resume'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send({ message: 'File uploaded successfully', file: req.file });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});