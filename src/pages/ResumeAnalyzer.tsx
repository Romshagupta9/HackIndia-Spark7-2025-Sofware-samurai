
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";

const ResumeAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Resume Analyzer</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume and get AI-driven insights, optimization tips, and personalized recommendations to make your resume stand out.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!uploadedFile ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <ResumeUploader onUploadComplete={setUploadedFile} />
            </div>
          ) : (
            <ResumeAnalysis file={uploadedFile} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalyzer;
