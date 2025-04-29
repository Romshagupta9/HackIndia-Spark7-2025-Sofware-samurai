
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, User, Settings, LogOut, Award, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ResumeHistoryItem from "@/components/profile/ResumeHistoryItem";

interface UserData {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

interface ResumeHistoryItem {
  id: string;
  name: string;
  date: string;
  score: number;
  improvements: string[];
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0);
  const [resumeHistory, setResumeHistory] = useState<ResumeHistoryItem[]>([]);
  
  // Mock resume history data
  const mockResumeHistory = [
    {
      id: "1",
      name: "Software_Engineer_Resume_v2.pdf",
      date: "2023-04-10",
      score: 72,
      improvements: [
        "Added quantifiable achievements",
        "Improved technical skills section",
        "Fixed formatting issues"
      ]
    },
    {
      id: "2",
      name: "Software_Engineer_Resume_v3.pdf",
      date: "2023-04-25",
      score: 85,
      improvements: [
        "Enhanced project descriptions",
        "Added certifications",
        "Better keywords for ATS"
      ]
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const userDataStr = localStorage.getItem("saarthi_user");
    
    if (!userDataStr) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    try {
      const parsedUserData = JSON.parse(userDataStr) as UserData;
      setUserData(parsedUserData);
      
      // Load mock resume history
      setResumeHistory(mockResumeHistory);
      
      // Set mock gamification data
      setPoints(157);
      setLevel(3);
      setLevelProgress(70);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("saarthi_user");
    navigate("/login");
  };

  const calculateNextLevelPoints = () => {
    return 100 * level;
  };

  if (!userData) {
    return null; // Return null while checking auth status or redirecting
  }

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20 p-8 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col items-center md:flex-row md:items-center mb-6 md:mb-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-orange-600 to-green-600 flex items-center justify-center text-white text-3xl font-bold mb-4 md:mb-0 md:mr-6 shadow-md">
                  {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span className="text-lg font-semibold">{points} points</span>
                </div>
                <Button 
                  variant="outline" 
                  className="border-red-200 hover:border-red-300 text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>

            {/* Gamification Level Bar */}
            <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Level {level}</span>
                <span className="text-sm text-gray-500">{levelProgress}% to Level {level+1}</span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-gray-200 dark:bg-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full" 
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </Progress>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{points} points</span>
                <span className="text-xs text-gray-500">{calculateNextLevelPoints()} points</span>
              </div>
            </div>

            {/* Profile Content */}
            <Tabs defaultValue="resumes" className="p-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="resumes">
                  <FileText className="h-4 w-4 mr-2" />
                  Resumes
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resumes" className="py-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">My Resume History</h2>
                  <Button onClick={() => navigate("/resume-analyzer")} className="bg-gradient-to-r from-orange-600 to-green-600">
                    Upload New Resume
                  </Button>
                </div>
                
                {resumeHistory.length > 0 ? (
                  <div className="space-y-4">
                    {resumeHistory.map((resume) => (
                      <div key={resume.id} className="bg-white dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                          <div className="flex items-center mb-2 md:mb-0">
                            <FileText className="h-5 w-5 text-gray-500 mr-2" />
                            <h3 className="font-medium">{resume.name}</h3>
                          </div>
                          <div className="text-sm text-gray-500">Uploaded on {resume.date}</div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Resume Score</span>
                            <span className="text-sm font-medium">{resume.score}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${resume.score}%`,
                                backgroundColor: resume.score > 80 ? '#22c55e' : resume.score > 60 ? '#f59e0b' : '#ef4444'
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-medium mb-2">Improvements Made:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 pl-5 list-disc">
                          {resume.improvements.map((improvement, index) => (
                            <li key={index}>{improvement}</li>
                          ))}
                        </ul>
                        
                        {resume.id !== "1" && (
                          <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">+13% improvement from previous version</span>
                          </div>
                        )}
                        
                        <div className="mt-4 flex space-x-3">
                          <Button variant="outline" size="sm">View Report</Button>
                          <Button variant="ghost" size="sm">Download PDF</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You haven't uploaded any resumes yet.
                    </p>
                    <Button onClick={() => navigate("/resume-analyzer")}>
                      Upload Resume
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile" className="py-4">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Full Name
                      </label>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                        {userData.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Email Address
                      </label>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                        {userData.email}
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievement Stats */}
                  <div className="mt-8">
                    <h3 className="font-medium mb-4">Your Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-800/20">
                        <div className="font-bold text-2xl text-orange-600 dark:text-orange-400">{resumeHistory.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Resumes Uploaded</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/20">
                        <div className="font-bold text-2xl text-green-600 dark:text-green-400">{points}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800/20">
                        <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{level}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Current Level</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="py-4">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-saarthi-purple focus:ring-saarthi-purple"
                        />
                        <label htmlFor="email-notifications" className="ml-2">
                          Email notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="job-alerts"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-saarthi-purple focus:ring-saarthi-purple"
                        />
                        <label htmlFor="job-alerts" className="ml-2">
                          Job alerts
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="data-collection"
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300 text-saarthi-purple focus:ring-saarthi-purple"
                        />
                        <label htmlFor="data-collection" className="ml-2">
                          Allow data collection for personalization
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-orange-600 to-green-600 text-white">Save Settings</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
