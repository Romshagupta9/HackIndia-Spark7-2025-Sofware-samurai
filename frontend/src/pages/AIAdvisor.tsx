
import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AIAdvisor = () => {
  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your AI <span className="gradient-text">Career Advisor</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chat with सaarthi to get personalized career guidance, resume advice, interview tips, and job search strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 rounded-xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-orange-600 to-green-600 p-4 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                </div>
                <div className="text-white font-medium ml-4">AI Career Assistant</div>
              </div>
              <ChatInterface />
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-900/80 rounded-xl shadow-sm border border-orange-200/50 dark:border-orange-800/30 p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">What You Can Ask</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Resume improvement tips specific to your industry</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Interview questions for specific roles or companies</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Salary negotiation strategies and market rates</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Career path advice and skill development plans</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Job search strategy tailored to your field</p>
                </li>
              </ul>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-orange-600 to-green-600 text-white w-full shadow-md hover:shadow-lg transition-all" asChild>
                  <a href="/resume-analyzer">Analyze Your Resume</a>
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-900/80 rounded-xl shadow-sm border border-green-200/50 dark:border-green-800/30 p-6 mt-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">Voice Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Click the microphone button in the chat to use voice commands. Tell सaarthi your career questions using natural language.
              </p>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-green-50 dark:from-gray-800/50 dark:to-gray-800/70 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Tip:</strong> For best results, speak clearly and be specific about your questions. सaarthi can understand natural language queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAdvisor;
