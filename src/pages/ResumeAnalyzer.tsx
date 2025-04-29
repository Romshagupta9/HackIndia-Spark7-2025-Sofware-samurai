
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication state on component mount
  useEffect(() => {
    const user = localStorage.getItem("saarthi_user");
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file);
  };

  // If not logged in, component will redirect before rendering
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          AI Resume <span className="gradient-text">Analyzer</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Upload your resume for instant AI analysis, skill assessment, and a personalized Career Fit Score to help you stand out to employers.
        </p>

        <div className="max-w-5xl mx-auto">
          {!uploadedFile ? (
            <ResumeUploader onUploadComplete={handleUploadComplete} />
          ) : (
            <ResumeAnalysis file={uploadedFile} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalyzer;
