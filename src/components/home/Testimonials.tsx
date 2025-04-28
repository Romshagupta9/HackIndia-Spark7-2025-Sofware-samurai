
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Software Engineer",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "Saarthi completely transformed my job search. The resume analyzer pointed out critical gaps in my technical skills section that I had overlooked. After implementing the suggestions, I received interview calls from three major tech companies within a week!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director",
    company: "BrandWave",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    content:
      "The AI career advisor feature is like having a personal career coach available 24/7. I particularly appreciated the industry-specific advice that helped me transition from tech to marketing. Worth every penny!",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    position: "UX Designer",
    company: "DesignHub",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    content:
      "As someone who struggles with writing cover letters, Saarthi's guidance was invaluable. The AI helped me highlight my UX portfolio in ways I hadn't considered before. The voice assistant feature is also incredibly convenient.",
    rating: 4,
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Financial Analyst",
    company: "Global Finance Partners",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    content:
      "The job trend insights helped me pivot my career focus toward fintech, which I hadn't previously considered. Six months later, I'm in a role that pays 30% more than my previous position. Thank you, Saarthi!",
    rating: 5,
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    position: "Healthcare Administrator",
    company: "CityHealth Systems",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    content:
      "I was skeptical about AI career advice, but Saarthi proved me wrong. The platform understood the nuances of the healthcare industry and provided targeted advice that generic career sites couldn't match.",
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
