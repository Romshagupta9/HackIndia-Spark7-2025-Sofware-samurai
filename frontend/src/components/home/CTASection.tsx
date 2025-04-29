
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onCTAClick: () => void;
}

const CTASection = ({ onCTAClick }: CTASectionProps) => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient effects - Indian flag inspired colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Journey With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">सaarthi</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our community of professionals who are using AI to enhance their resumes,
            improve their skills, and discover new career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-green-600 text-white" onClick={onCTAClick}>
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onCTAClick}>
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
