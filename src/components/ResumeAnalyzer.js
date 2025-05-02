import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';

const ResumeAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleAnalyzeResume = async () => {
        try {
            const formData = new FormData();
            formData.append('resume', selectedFile);
            formData.append('jobDescription', jobDescription);

            const response = await fetch('https://your-backend-endpoint/analyze-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            setAnalysisResult(data);
        } catch (error) {
            console.error('Error analyzing resume:', error);
            setErrorMessage('Failed to analyze resume. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Resume Analyzer</h1>
            <input type="file" onChange={handleFileChange} />
            <textarea
                placeholder="Enter job description"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
            />
            <button onClick={handleAnalyzeResume}>Analyze Resume</button>
            <ErrorMessage message={errorMessage} />

            {analysisResult && <div>{JSON.stringify(analysisResult)}</div>}        </div>
    );
};

export default ResumeAnalyzer;