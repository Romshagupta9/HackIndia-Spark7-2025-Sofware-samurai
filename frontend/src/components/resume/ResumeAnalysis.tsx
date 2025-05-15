import { useState, useEffect } from "react";
import { 
  CheckCircle2, AlertTriangle, Star, 
  ArrowUpRight, Download, Check, User, 
  Briefcase, PenTool, GraduationCap, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResumeAnalysisProps {
  file: File;
  analysisData: AnalysisData | null;
}

interface Skill {
  name: string;
  level: "expert" | "proficient" | "familiar";
  recommendation?: string;
  matchScore?: number;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  highlights: string[];
  recommendation?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface KeywordMatch {
  keyword: string;
  found: boolean;
}

interface AnalysisData {
  score: number;
  careerFitScore: number;
  strengths: string[];
  weaknesses: string[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  recommendations: string[];
  keywordMatches?: KeywordMatch[];
}

// Simulated analysis data
const mockAnalysisData: AnalysisData = {
  score: 72,
  careerFitScore: 85,
  strengths: [
    "Strong technical skills section with quantifiable metrics",
    "Clear work experience chronology with measurable achievements",
    "Good overall formatting and readability",
  ],
  weaknesses: [
    "Missing targeted keywords for job market positioning",
    "Professional summary could be more impactful",
    "Limited demonstration of soft skills",
  ],
  skills: [
    { name: "React.js", level: "expert", matchScore: 95 },
    { name: "TypeScript", level: "proficient", matchScore: 87 },
    { name: "Node.js", level: "proficient", matchScore: 92 },
    { name: "Python", level: "familiar", recommendation: "Consider adding specific Python libraries you've used", matchScore: 45 },
    { name: "Agile Methodology", level: "familiar", matchScore: 78 },
  ],
  experiences: [
    {
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      duration: "2020 - Present",
      highlights: [
        "Led redesign of customer portal increasing user engagement by 35%",
        "Mentored 4 junior developers and conducted code reviews",
      ],
      recommendation: "Consider adding more metrics and business impact to this role"
    },
    {
      position: "Frontend Developer",
      company: "Web Solutions LLC",
      duration: "2018 - 2020",
      highlights: [
        "Developed responsive UI components using React and Redux",
        "Collaborated with UX team on redesign initiatives",
      ]
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "State University",
      year: "2018",
    }
  ],
  recommendations: [
    "Add a stronger professional summary highlighting your value proposition",
    "Include specific keywords from job descriptions in your target field",
    "Quantify achievements in your most recent role with concrete metrics",
    "Add relevant certifications or continuous learning activities",
  ],
  keywordMatches: [
    { keyword: "React", found: true },
    { keyword: "TypeScript", found: true },
    { keyword: "Redux", found: true },
    { keyword: "Unit Testing", found: false },
    { keyword: "CI/CD", found: false },
    { keyword: "AWS", found: false },
    { keyword: "Agile", found: true },
    { keyword: "Team Leadership", found: true },
  ]
};

const ResumeAnalysis = ({ file, analysisData }: ResumeAnalysisProps) => {
  if (!analysisData) {
    return (
      <div className="flex flex-col items-center py-16">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">Analysis Error</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
          We encountered an issue while analyzing your resume. Please try uploading again.
        </p>
        <Button variant="outline">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-1">Resume Analysis</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{file.name}</p>
        <div className="flex items-center space-x-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">Resume Score</div>
            <span className="text-3xl font-bold text-green-500">{analysisData.score}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">Career Fit</div>
            <span className="text-3xl font-bold text-blue-500">{analysisData.careerFitScore}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              Strengths
            </h3>
            <ul className="mb-4 list-disc ml-6 text-green-700 dark:text-green-300">
              {analysisData.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              Weaknesses
            </h3>
            <ul className="mb-4 list-disc ml-6 text-yellow-700 dark:text-yellow-300">
              {analysisData.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Skills</h3>
        <div className="space-y-4">
          {analysisData.skills.map((skill, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-2 last:border-b-0">
              <div className="flex items-center">
                <span className="font-medium mr-2">{skill.name}</span>
                {skill.level === "expert" && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                <span className="ml-2 text-xs text-gray-500">{skill.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{skill.matchScore}%</span>
                <Progress value={skill.matchScore || 0} className="h-2 w-32" />
              </div>
              {skill.recommendation && (
                <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 md:mt-0 md:ml-4">{skill.recommendation}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Experience</h3>
        <div className="space-y-6">
          {analysisData.experiences.map((exp, i) => (
            <div key={i} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-1">
                <Briefcase className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">{exp.position}</span>
                <span className="mx-2 text-gray-500">|</span>
                <span className="text-gray-700 dark:text-gray-300">{exp.company}</span>
                <span className="mx-2 text-gray-400">({exp.duration})</span>
              </div>
              <ul className="list-disc ml-8 text-gray-700 dark:text-gray-300">
                {exp.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
              {exp.recommendation && (
                <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">{exp.recommendation}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Education</h3>
        <div className="space-y-2">
          {analysisData.education.map((edu, i) => (
            <div key={i} className="flex items-center">
              <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">{edu.degree}</span>
              <span className="mx-2 text-gray-500">|</span>
              <span>{edu.institution}</span>
              <span className="mx-2 text-gray-400">({edu.year})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
        <ul className="list-disc ml-6 text-primary">
          {analysisData.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Keyword Matches */}
      {analysisData.keywordMatches && (
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Keyword Matches</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {analysisData.keywordMatches.map((kw, i) => (
              <div key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${kw.found ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {kw.keyword}: {kw.found ? "Found" : "Missing"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
/// #region