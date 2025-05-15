import React, { useState } from "react";
import axios from "axios";

const ResumeUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !jobDescription) {
      setError("Both resume file and job description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const token = localStorage.getItem("token"); // Get JWT from localStorage or cookies

      const response = await axios.post("http://localhost:5000/api/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Send JWT here
        },
      });

      setAnalysis(response.data.analysis);
      setError(null);
    } catch (err: any) {
      console.error("Error uploading resume:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to analyze resume.");
    }
  };

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea
        placeholder="Enter job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload and Analyze</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {analysis && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
