
import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <Layout>
      <Hero scrollToFeatures={scrollToFeatures} />
      <div ref={featuresRef}>
        <Features />
      </div>
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
    </Layout>
  );
};

export default Index;
