
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  scrollToFeatures: () => void;
}

const Hero = ({ scrollToFeatures }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-saarthi-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-saarthi-purple/20 rounded-full blur-3xl"></div>
      </div>

      {/* Animated particles or orbs (simple version) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/30 animate-float`}
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto flex flex-col items-center text-center z-10">
        {/* Badge */}
        <div className="mb-6 bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            ✨ Your AI Career Companion
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Saarthi</span> - Advance Your Career
          <br className="hidden md:block" /> With AI Guidance
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          Let AI analyze your resume, provide personalized career advice, and help you navigate 
          your professional journey with confidence.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" className="bg-blue-purple-gradient" asChild>
            <Link to="/signup">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/demo">See How It Works</Link>
          </Button>
        </div>

        {/* Scroll down indicator */}
        <button 
          onClick={scrollToFeatures} 
          className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Learn More</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>

      {/* Floating UI mockup */}
      <div className="relative mt-16 md:mt-8 w-full max-w-4xl mx-auto">
        <div className="glass-card rounded-xl overflow-hidden shadow-lg border-t border-white/50">
          <div className="bg-gray-800 p-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-gray-400 text-sm">Saarthi AI Career Assistant</div>
          </div>
          <div className="p-4 md:p-6 bg-white/90 dark:bg-gray-900/90">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 animate-pulse-light">
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                </div>
              </div>
              <div className="flex-1 animate-pulse-light" style={{ animationDelay: "0.2s" }}>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
