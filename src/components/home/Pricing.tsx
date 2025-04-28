
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular = false,
}) => {
  return (
    <div
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
        isPopular ? "border-saarthi-purple shadow-glow" : ""
      }`}
    >
      {isPopular && (
        <div className="bg-blue-purple-gradient text-white text-center py-1.5 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold">${price}</span>
          {price > 0 && (
            <span className="text-gray-600 dark:text-gray-400">/month</span>
          )}
        </div>
        <Button
          className={isPopular ? "bg-blue-purple-gradient w-full" : "w-full"}
          variant={isPopular ? "default" : "outline"}
        >
          {price === 0 ? "Sign Up Free" : "Subscribe Now"}
        </Button>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
          <p className="font-medium mb-4">What's included:</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Essential tools to get started",
      features: [
        "Basic resume analysis",
        "AI chat (5 questions/day)",
        "Job trend reports (weekly)",
        "1 resume version",
      ],
    },
    {
      name: "Professional",
      price: 19,
      description: "For active job seekers",
      features: [
        "Advanced resume analysis",
        "Unlimited AI chat",
        "Job trend reports (daily)",
        "5 resume versions",
        "Voice assistant",
        "WhatsApp & Telegram integration",
        "Priority support",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: 49,
      description: "For career advancement",
      features: [
        "Everything in Professional",
        "Career coaching sessions",
        "Interview preparation",
        "Unlimited resume versions",
        "LinkedIn profile optimization",
        "Custom integrations",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingTier key={index} {...plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Need a custom plan for your organization?
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
