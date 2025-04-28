
import { useState } from "react";
import { Upload, Check, AlertCircle, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploaderProps {
  onUploadComplete: (file: File) => void;
}

const ResumeUploader = ({ onUploadComplete }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    if (!allowedFileTypes.includes(file.type)) {
      setError("Please upload a PDF or Word document");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {  // 5MB
      setError("File size must be less than 5MB");
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      onUploadComplete(file);
    }, 1500);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 dark:border-gray-700 hover:border-primary"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <p className="mb-2 text-center font-medium">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              PDF or Word Document (max 5MB)
            </p>
            <input
              id="resume-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              Select Resume
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="mt-6">
            <Button
              className="bg-blue-purple-gradient w-full"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Analyze Resume"}
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium mb-2">Tips for better results:</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Make sure your resume is up-to-date with your latest experience
          </li>
          <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Use standard formatting for best parsing accuracy
          </li>
          <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Include relevant skills, education, and contact information
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUploader;
