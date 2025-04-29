
import { Check } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description:
        "Start by uploading your current resume. Saarthi accepts PDF, DOCX, and other common file formats.",
      benefits: [
        "Instant parsing and analysis",
        "Secure and private document handling",
        "No data sharing with third parties",
      ],
    },
    {
      number: "02",
      title: "Receive AI Analysis",
      description:
        "Our advanced AI will analyze your resume and provide detailed insights and recommendations.",
      benefits: [
        "Skill gap identification",
        "Industry-specific optimization",
        "ATS compatibility check",
      ],
    },
    {
      number: "03",
      title: "Get Personalized Advice",
      description:
        "Chat with Saarthi to receive personalized career guidance and job search strategies.",
      benefits: [
        "Interview preparation tips",
        "Salary negotiation advice",
        "Career path recommendations",
      ],
    },
    {
      number: "04",
      title: "Track Your Progress",
      description:
        "Monitor your professional growth and resume improvements over time.",
      benefits: [
        "Visual progress tracking",
        "Milestone celebrations",
        "Continuous improvement suggestions",
      ],
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Saarthi</span> Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A simple four-step process to transform your career journey with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <span className="text-4xl font-bold gradient-text">{step.number}</span>
                  <div className="ml-4 h-px bg-gradient-to-r from-saarthi-blue to-saarthi-purple flex-grow"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
                <div className="mt-auto">
                  <p className="font-medium mb-2">Benefits:</p>
                  <ul className="space-y-2">
                    {step.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
