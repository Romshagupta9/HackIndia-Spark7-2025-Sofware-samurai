
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onCTAClick: () => void;
}

const CTASection = ({ onCTAClick }: CTASectionProps) => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-saarthi-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-saarthi-purple/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Accelerate Your <span className="gradient-text">Career Growth</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who are leveraging AI to advance their careers. 
            Get started with Saarthi today and unlock your full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-purple-gradient" onClick={onCTAClick}>
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onCTAClick}>
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            No credit card required. 7-day free trial on all premium features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
