
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Chrome, MessageSquare, Phone, ArrowRight,
  CheckCircle2, AlertCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

const IntegrationCard = ({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  buttonText, 
  buttonLink 
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  status: "available" | "coming-soon";
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="bg-blue-purple-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        {status === "available" ? (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span className="text-sm">Available Now</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Coming Soon</span>
          </div>
        )}
      </div>
      <Button 
        className={status === "available" ? "bg-blue-purple-gradient w-full" : "w-full"} 
        variant={status === "available" ? "default" : "outline"}
        disabled={status !== "available"}
        asChild
      >
        <Link to={buttonLink}>
          {buttonText} {status === "available" && <ArrowRight className="ml-2 h-4 w-4" />}
        </Link>
      </Button>
    </div>
  );
};

const Integrations = () => {
  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Seamless <span className="gradient-text">Integrations</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with Saarthi across multiple platforms to access career guidance wherever you are.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <IntegrationCard
            title="LinkedIn Companion"
            description="Browser extension that analyzes LinkedIn profiles, suggests improvements, and finds matching jobs."
            icon={Chrome}
            status="available"
            buttonText="Install Extension"
            buttonLink="/integrations/linkedin"
          />
          
          <IntegrationCard
            title="WhatsApp Bot"
            description="Connect with Saarthi via WhatsApp to receive job alerts, quick resume tips, and career advice on the go."
            icon={Phone}
            status="available"
            buttonText="Connect WhatsApp"
            buttonLink="/integrations/whatsapp"
          />
          
          <IntegrationCard
            title="Telegram Bot"
            description="Chat with Saarthi on Telegram for daily career tips, personalized job matches, and interview preparation."
            icon={MessageSquare}
            status="coming-soon"
            buttonText="Join Waitlist"
            buttonLink="/integrations/telegram-waitlist"
          />
        </div>

        {/* LinkedIn Companion Details */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-purple-gradient w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Chrome className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">LinkedIn Companion</h2>
                <p className="text-gray-600 dark:text-gray-300">Enhance your LinkedIn experience with AI-powered insights</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Profile optimization suggestions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Job match scoring for LinkedIn listings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Personalized connection recommendations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Content engagement insights
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      One-click access to Saarthi AI assistant
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">Installation Guide</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      1
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Download the extension from the Chrome Web Store
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      2
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click "Add to Chrome" and confirm the installation
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      3
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Sign in to your Saarthi account via the extension
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      4
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Visit LinkedIn to see Saarthi insights on profiles and job listings
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-blue-purple-gradient" size="lg">
                Download LinkedIn Companion
              </Button>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration Details */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-purple-gradient w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">WhatsApp Integration</h2>
                <p className="text-gray-600 dark:text-gray-300">Access Saarthi's career guidance on your favorite messaging platform</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Available Commands</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="font-mono text-primary">/jobs [keyword]</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Get the latest job openings matching your keyword
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="font-mono text-primary">/tip resume</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Receive a daily resume optimization tip
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="font-mono text-primary">/tip interview</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Get interview preparation advice
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <code className="font-mono text-primary">/ask [question]</code>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Ask Saarthi any career-related question
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">How to Connect</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      1
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Scan the QR code below or click the connect button
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      2
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Send the message "JOIN SAARTHI" to start the conversation
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      3
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Link your Saarthi account when prompted
                    </p>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-purple-gradient text-white flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0">
                      4
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Start using commands to access Saarthi's features
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-blue-purple-gradient" size="lg">
                Connect WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Integrations;
