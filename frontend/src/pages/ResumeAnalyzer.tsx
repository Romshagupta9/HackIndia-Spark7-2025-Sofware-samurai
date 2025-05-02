import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication state on component mount
  useEffect(() => {
    const user = localStorage.getItem("saarthi_user");
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleUploadComplete = (analysis: any) => {
    setAnalysisData(analysis);
    setUploadedFile("resume.pdf"); // Just a placeholder for file name
  };

  if (!isLoggedIn) {
    return null; // Redirecting, so don't render anything
  }

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">Analyzer</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Upload your resume for instant AI analysis, skill assessment, and a personalized Career Fit Score to help you stand out to employers.
        </p>

        <div className="max-w-5xl mx-auto">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {!analysisData ? (
            <ResumeUploader onUploadComplete={handleUploadComplete} />
          ) : (
            <ResumeAnalysis
              file={
                new File([""], uploadedFile || "resume.pdf", { type: "application/pdf" })
              }
              analysisData={analysisData}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalyzer;
