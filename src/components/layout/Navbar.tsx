
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">Saarthi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/testimonials" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>

          {/* CTA and Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="bg-blue-purple-gradient" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="ml-2">
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            <Link
              to="/"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/testimonials"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Testimonials
            </Link>
            <div className="flex space-x-3 pt-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-blue-purple-gradient w-full" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
