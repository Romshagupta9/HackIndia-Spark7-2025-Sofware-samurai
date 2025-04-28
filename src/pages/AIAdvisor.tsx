
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
            Chat with Saarthi to get personalized career guidance, resume advice, interview tips, and job search strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <ChatInterface />
          </div>
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="font-semibold text-lg mb-4">What You Can Ask</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Resume improvement tips specific to your industry</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Interview questions for specific roles or companies</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Salary negotiation strategies and market rates</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Career path advice and skill development plans</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Job search strategy tailored to your field</p>
                </li>
              </ul>

              <div className="mt-8">
                <Button className="bg-blue-purple-gradient w-full" asChild>
                  <a href="/resume-analyzer">Analyze Your Resume</a>
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Voice Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Click the microphone button in the chat to use voice commands. Tell Saarthi your career questions using natural language.
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Tip:</strong> For best results, speak clearly and be specific about your questions. Saarthi can understand natural language queries.
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
