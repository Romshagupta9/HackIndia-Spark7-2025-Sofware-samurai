
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    position: "Software Engineer",
    company: "InfoTech Solutions",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "सaarthi ने मेरी जॉब सर्च को पूरी तरह से बदल दिया है। AI रेज्यूमे एनालाइज़र ने मेरे टेक्निकल स्किल्स सेक्शन में कई महत्वपूर्ण सुधार सुझाए। इसकी मदद से मुझे तीन बड़ी टेक कंपनियों से इंटरव्यू कॉल्स मिल गए!",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    position: "Marketing Director",
    company: "DigiMarket India",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    content:
      "AI कैरियर एडवाइज़र फीचर 24/7 उपलब्ध पर्सनल कैरियर कोच जैसा है। मुझे इंडस्ट्री-स्पेसिफिक सलाह मिली जिससे मुझे टेक से मार्केटिंग में ट्रांज़िशन करने में मदद मिली। हर पैसे के लायक सेवा!",
    rating: 5,
  },
  {
    id: 3,
    name: "Neha Patel",
    position: "UX Designer",
    company: "CreativeMinds Studio",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "कवर लेटर लिखने में परेशानी होने के कारण, सaarthi का मार्गदर्शन बहुत मूल्यवान था। AI ने मेरे UX पोर्टफोलियो को ऐसे तरीकों से हाइलाइट करने में मदद की जो मैंने पहले नहीं सोचे थे। वॉयस असिस्टेंट फीचर भी बहुत सुविधाजनक है।",
    rating: 4,
  },
  {
    id: 4,
    name: "Vikram Singh",
    position: "Financial Analyst",
    company: "Bharat Finance Partners",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    content:
      "जॉब ट्रेंड इनसाइट्स ने मुझे फिनटेक की ओर अपना करियर फोकस बदलने में मदद की, जिसके बारे में मैंने पहले नहीं सोचा था। छह महीने बाद, मैं अपनी पिछली पोजिशन से 30% अधिक वेतन वाली नौकरी में हूं। धन्यवाद, सaarthi!",
    rating: 5,
  },
  {
    id: 5,
    name: "Anjali Gupta",
    position: "Healthcare Administrator",
    company: "MediCare Systems India",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    content:
      "मैं AI कैरियर सलाह के बारे में संदिग्ध थी, लेकिन सaarthi ने मुझे गलत साबित किया। प्लेटफॉर्म ने हेल्थकेयर इंडस्ट्री की बारीकियों को समझा और ऐसी टारगेटेड सलाह दी जो जेनेरिक कैरियर साइट्स नहीं दे सकती।",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how Saarthi has helped professionals across various industries advance their careers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop View */}
          <div className="hidden md:flex gap-6">
            {testimonials
              .slice(activeIndex, activeIndex + 3)
              .concat(
                testimonials.slice(0, Math.max(0, 3 - (testimonials.length - activeIndex)))
              )
              .map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`glass-card p-6 rounded-xl flex-1 transition-all duration-500 ${
                    index === 1
                      ? "transform scale-105 shadow-lg z-10"
                      : "transform scale-95 opacity-70"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 dark:text-gray-300">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonials[activeIndex].rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-gray-600 dark:text-gray-300">
                "{testimonials[activeIndex].content}"
              </blockquote>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-6 bg-saarthi-purple"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
