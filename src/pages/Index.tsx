
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProtectedRouteClick = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("saarthi_user");
    
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
    } else {
      // Navigate to requested page if logged in
      // This would be customized based on which link was clicked
      navigate("/resume-analyzer");
    }
  };

  return (
    <Layout>
      <Hero scrollToFeatures={scrollToFeatures} />
      <div ref={featuresRef}>
        <Features onFeatureClick={handleProtectedRouteClick} />
      </div>
      <HowItWorks />
      <Testimonials />
      <CTASection onCTAClick={handleProtectedRouteClick} />
    </Layout>
  );
};

export default Index;
