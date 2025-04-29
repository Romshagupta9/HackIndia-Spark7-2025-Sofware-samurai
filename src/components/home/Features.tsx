
import React from "react";
import { 
  FileText, MessageSquare, Mic, TrendingUp, 
  Chrome, Phone, FileCheck, User 
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  onClick 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="glass-card p-6 rounded-xl flex flex-col items-start transition-all duration-300 hover:shadow-glow cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-blue-purple-gradient p-3 rounded-lg mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Features = ({ onFeatureClick }: { onFeatureClick: () => void }) => {
  const features = [
    {
      icon: FileText,
      title: "Resume Analyzer",
      description:
        "Upload your resume and receive detailed insights, skill analysis, and tailored optimization suggestions powered by AI.",
    },
    {
      icon: MessageSquare,
      title: "AI Career Advisor",
      description:
        "Chat with our sophisticated AI assistant for personalized career guidance, interview tips, and professional development advice.",
    },
    {
      icon: Mic,
      title: "Voice Assistant",
      description:
        "Speak directly to Saarthi with voice commands and receive audio responses for a hands-free advisory experience.",
    },
    {
      icon: TrendingUp,
      title: "Job Trend Insights",
      description:
        "Stay ahead with real-time data on job market trends, in-demand skills, and emerging opportunities in your industry.",
    },
    {
      icon: Chrome,
      title: "Browser Extension",
      description:
        "Enhance your job search with our LinkedIn companion that provides instant profile optimization tips and job matches.",
    },
    {
      icon: Phone,
      title: "WhatsApp & Telegram",
      description:
        "Connect Saarthi to your favorite messaging apps for on-the-go career guidance and job alerts wherever you are.",
    },
    {
      icon: FileCheck,
      title: "Smart Resume Builder",
      description:
        "Create ATS-optimized resumes with AI guidance that highlights your strengths and matches job requirements.",
    },
    {
      icon: User,
      title: "Personalized Dashboard",
      description:
        "Track your professional growth with a timeline view of your resume versions, improvements, and career milestones.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Your <span className="gradient-text">Career Growth</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Saarthi combines cutting-edge AI technology with career expertise to provide you with the tools you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={onFeatureClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
