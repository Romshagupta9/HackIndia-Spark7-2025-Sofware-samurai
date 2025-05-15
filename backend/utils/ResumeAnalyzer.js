import React, { useState } from 'react';

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

      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        let errorMsg = "Failed to analyze resume";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } else {
          const errorText = await response.text();
          errorMsg = errorText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        const text = await response.text();
        setErrorMessage("Unexpected response from server: " + text);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {analysisResult && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;