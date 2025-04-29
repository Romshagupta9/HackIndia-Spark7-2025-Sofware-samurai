
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

const ResumeAnalysis = ({ file }: ResumeAnalysisProps) => {
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'experience' | 'recommendations' | 'career-fit'>('overview');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAnalysisData(mockAnalysisData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [file]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-16">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-medium mb-2">Analyzing Your Resume</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
          Our AI is reviewing your resume and extracting key information. This will take just a moment...
        </p>
      </div>
    );
  }

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSkillLevelBadge = (level: string) => {
    switch (level) {
      case "expert":
        return (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
            Expert
          </span>
        );
      case "proficient":
        return (
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
            Proficient
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
            Familiar
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Header with resume score */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Resume Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
              {file.name}
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Resume Score</div>
              <div className="flex items-center mb-1">
                <span className={`text-3xl font-bold ${getScoreColor(analysisData.score)}`}>
                  {analysisData.score}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/100</span>
              </div>
              <div className="w-full max-w-[120px]">
                <Progress value={analysisData.score} className={`h-2 ${getProgressColor(analysisData.score)}`} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Career Fit</div>
              <div className="flex items-center mb-1">
                <span className={`text-3xl font-bold ${getScoreColor(analysisData.careerFitScore)}`}>
                  {analysisData.careerFitScore}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/100</span>
              </div>
              <div className="w-full max-w-[120px]">
                <Progress value={analysisData.careerFitScore} className={`h-2 ${getProgressColor(analysisData.careerFitScore)}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800 mt-8">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "career-fit"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("career-fit")}
          >
            Career Fit
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "skills"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "experience"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            Experience
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "recommendations"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("recommendations")}
          >
            Recommendations
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {analysisData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {analysisData.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Resume Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-3">
                    <User className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Personal Info</p>
                    <p className="font-medium">Well Structured</p>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md mr-3">
                    <Briefcase className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                    <p className="font-medium">{analysisData.experiences.length} Entries</p>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-3">
                    <PenTool className="h-5 w-5 text-orange-700 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Skills</p>
                    <p className="font-medium">{analysisData.skills.length} Listed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Career Fit Tab */}
        {activeTab === "career-fit" && (
          <div className="animate-fade-in">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg mb-2">Career Fit Assessment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI evaluation of how well your resume matches target job requirements
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center">
                    <Award className="h-6 w-6 text-yellow-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Career Fit Score</div>
                      <div className="text-2xl font-bold">{analysisData.careerFitScore}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-4">Keyword Match Analysis</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {analysisData.keywordMatches?.map((match, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {match.keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {match.found ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Found
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Missing
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-4">Skill Match Analysis</h4>
                <div className="space-y-4">
                  {analysisData.skills.slice(0, 5).map((skill, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className={`${
                          (skill.matchScore || 0) >= 80 
                            ? "text-green-600 dark:text-green-400" 
                            : (skill.matchScore || 0) >= 60 
                            ? "text-yellow-600 dark:text-yellow-400" 
                            : "text-red-600 dark:text-red-400"
                        }`}>
                          {skill.matchScore || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            (skill.matchScore || 0) >= 80 
                              ? "bg-green-500" 
                              : (skill.matchScore || 0) >= 60 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          }`}
                          style={{ width: `${skill.matchScore}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                Career Fit Recommendations
              </h4>
              <ul className="space-y-2 ml-7">
                <li className="list-disc text-gray-700 dark:text-gray-300">
                  Add missing keywords like "Unit Testing", "CI/CD", and "AWS" to your resume
                </li>
                <li className="list-disc text-gray-700 dark:text-gray-300">
                  Highlight more examples of team leadership and project management
                </li>
                <li className="list-disc text-gray-700 dark:text-gray-300">
                  Quantify your achievements with more specific metrics and business outcomes
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-lg mb-4">Skills Analysis</h3>
            <div className="space-y-4">
              {analysisData.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{skill.name}</span>
                      {getSkillLevelBadge(skill.level)}
                    </div>
                    {skill.level === "expert" && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  
                  {skill.matchScore !== undefined && (
                    <div className="mt-2 mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Market Match</span>
                        <span className={`font-medium ${
                          skill.matchScore >= 80 
                            ? "text-green-600 dark:text-green-400" 
                            : skill.matchScore >= 60 
                            ? "text-yellow-600 dark:text-yellow-400" 
                            : "text-red-600 dark:text-red-400"
                        }`}>
                          {skill.matchScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            skill.matchScore >= 80 
                              ? "bg-green-500" 
                              : skill.matchScore >= 60 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          }`}
                          style={{ width: `${skill.matchScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {skill.recommendation && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border-l-2 border-yellow-500">
                      <span className="font-medium">Tip:</span> {skill.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="text-primary" variant="link" asChild>
                <a href="#">
                  View in-demand skills in your industry <ArrowUpRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Experience Analysis</h3>
            </div>
            <div className="space-y-6">
              {analysisData.experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{exp.position}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {exp.company} • {exp.duration}
                      </p>
                    </div>
                  </div>
                  
                  <h5 className="text-sm font-medium mb-2">Key Highlights:</h5>
                  <ul className="space-y-1 mb-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {exp.recommendation && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border-l-2 border-yellow-500 mt-3">
                      <span className="font-medium">Suggestion:</span> {exp.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              {analysisData.education.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg mb-4">Education</h3>
                  <div className="space-y-4">
                    {analysisData.education.map((edu, index) => (
                      <div 
                        key={index} 
                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex items-start"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-3">
                          <GraduationCap className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {edu.institution} • {edu.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-lg mb-4">Key Recommendations</h3>
            <div className="space-y-4">
              {analysisData.recommendations.map((recommendation, index) => (
                <div 
                  key={index} 
                  className="p-4 glass-card rounded-xl"
                >
                  <div className="flex items-start">
                    <div className="p-1.5 bg-primary/10 rounded-full mr-3 mt-0.5">
                      <div className="h-4 w-4 text-primary">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-blue-purple-gradient w-full sm:w-auto">
                Get Detailed Improvement Plan
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href="#">
                  <Download className="h-4 w-4 mr-2" />
                  Download Analysis Report
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
