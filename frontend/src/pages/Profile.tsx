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

interface ResumeHistoryItemType {
  id: string;
  name: string;
  date: string;
  score: number;
  improvements: string[];
  improvement?: number;
  analysis?: any;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0);
  const [resumeHistory, setResumeHistory] = useState<ResumeHistoryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    dataCollection: true,
  });
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<{ name: string; email: string }>({ name: "", email: "" });

  // Fetch user profile and resume history from backend
  const fetchProfile = async () => {
    const userDataStr = localStorage.getItem("saarthi_user");
    if (!userDataStr) {
      navigate("/login");
      return;
    }
    try {
      const parsedUserData = JSON.parse(userDataStr) as UserData;
      setUserData(parsedUserData);
      setProfileForm({ name: parsedUserData.name, email: parsedUserData.email });

      const token = localStorage.getItem("saarthi_token");
      const res = await fetch("/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPoints(data.points || 0);
        setLevel(data.level || 1);
        setLevelProgress(data.levelProgress || 0);
        setSettings(data.settings || settings);
      }
      // Resume history
      const res2 = await fetch("/api/resume/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res2.ok) {
        const data2 = await res2.json();
        setResumeHistory(data2.history || []);
      } else {
        setResumeHistory([]);
      }
    } catch (error) {
      setUserData(null);
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    // Listen for resume upload event (custom event)
    const handler = () => fetchProfile();
    window.addEventListener("resume_uploaded", handler);
    return () => window.removeEventListener("resume_uploaded", handler);
  }, [navigate]);

  // Real-time update profile info
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    const token = localStorage.getItem("saarthi_token");
    const res = await fetch("/api/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileForm),
    });
    if (res.ok) {
      const updated = await res.json();
      setUserData((prev) => ({ ...prev!, ...updated }));
      localStorage.setItem("saarthi_user", JSON.stringify({ ...userData, ...updated }));
      setEditProfile(false);
    }
  };

  // Update settings
  const handleSettingsChange = async (newSettings: typeof settings) => {
    setSettings(newSettings);
    const token = localStorage.getItem("saarthi_token");
    await fetch("/api/profile/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSettings),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("saarthi_user");
    localStorage.removeItem("saarthi_token");
    navigate("/login");
  };

  const calculateNextLevelPoints = () => 100 * level;

  if (loading || !userData) {
    return null;
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
                      <ResumeHistoryItem
                        key={resume.id}
                        {...resume}
                      />
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
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Full Name
                        </label>
                        <input
                          className="p-2 border border-gray-200 dark:border-gray-700 rounded-md w-full"
                          value={profileForm.name}
                          onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                          disabled={!editProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                          Email Address
                        </label>
                        <input
                          className="p-2 border border-gray-200 dark:border-gray-700 rounded-md w-full"
                          value={profileForm.email}
                          onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                          disabled={!editProfile}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {!editProfile ? (
                        <Button type="button" onClick={() => setEditProfile(true)}>
                          Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button type="submit" className="bg-gradient-to-r from-orange-600 to-green-600 text-white">
                            Save Changes
                          </Button>
                          <Button type="button" variant="outline" onClick={() => {
                            setEditProfile(false);
                            setProfileForm({ name: userData?.name || "", email: userData?.email || "" });
                          }}>
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
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
                          checked={settings.emailNotifications}
                          onChange={e => handleSettingsChange({ ...settings, emailNotifications: e.target.checked })}
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
                          checked={settings.jobAlerts}
                          onChange={e => handleSettingsChange({ ...settings, jobAlerts: e.target.checked })}
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
                          checked={settings.dataCollection}
                          onChange={e => handleSettingsChange({ ...settings, dataCollection: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300 text-saarthi-purple focus:ring-saarthi-purple"
                        />
                        <label htmlFor="data-collection" className="ml-2">
                          Allow data collection for personalization
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-orange-600 to-green-600 text-white" onClick={() => handleSettingsChange(settings)}>
                    Save Settings
                  </Button>
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
