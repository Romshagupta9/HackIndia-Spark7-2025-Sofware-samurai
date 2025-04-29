
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, User, Settings, LogOut } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

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
    } catch (error) {
      console.error("Failed to parse user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("saarthi_user");
    navigate("/login");
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
            <div className="flex flex-col items-center p-8 border-b border-gray-200 dark:border-gray-800">
              <div className="h-24 w-24 rounded-full bg-blue-purple-gradient flex items-center justify-center text-white text-3xl font-bold mb-4">
                {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.email}</p>
              <Button 
                variant="outline" 
                className="border-red-200 hover:border-red-300 text-red-500 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
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
                <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You haven't uploaded any resumes yet.
                  </p>
                  <Button onClick={() => navigate("/resume-analyzer")}>
                    Upload Resume
                  </Button>
                </div>
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
                  
                  <Button>Save Settings</Button>
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
