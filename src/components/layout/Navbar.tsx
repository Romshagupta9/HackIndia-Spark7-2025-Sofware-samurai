
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu, X, UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check authentication state on mount and changes
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("saarthi_user");
      if (user) {
        setIsLoggedIn(true);
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || "User");
        } catch (e) {
          setUserName("User");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("saarthi_user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleNavigateToProtectedRoute = (route: string) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      navigate("/login");
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
            <button 
              onClick={() => handleNavigateToProtectedRoute("/resume-analyzer")} 
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              Resume Analyzer
            </button>
            <button 
              onClick={() => handleNavigateToProtectedRoute("/ai-advisor")} 
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              AI Advisor
            </button>
            <button 
              onClick={() => handleNavigateToProtectedRoute("/job-trends")} 
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              Job Trends
            </button>
          </nav>

          {/* CTA and Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <span className="font-medium">Hi, {userName}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/resume-analyzer")}>
                    Resume Analyzer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/ai-advisor")}>
                    AI Advisor
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="bg-blue-purple-gradient" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
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
            <button
              onClick={() => handleNavigateToProtectedRoute("/resume-analyzer")}
              className="block w-full text-left py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Resume Analyzer
            </button>
            <button
              onClick={() => handleNavigateToProtectedRoute("/ai-advisor")}
              className="block w-full text-left py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              AI Advisor
            </button>
            <button
              onClick={() => handleNavigateToProtectedRoute("/job-trends")}
              className="block w-full text-left py-2 text-gray-700 dark:text-gray-200 hover:text-primary"
            >
              Job Trends
            </button>
            
            <div className="flex space-x-3 pt-2">
              {isLoggedIn ? (
                <Button className="bg-blue-purple-gradient w-full" onClick={() => navigate("/profile")}>
                  <UserCircle className="h-5 w-5 mr-2" />
                  My Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button className="bg-blue-purple-gradient w-full" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </div>
            
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="w-full mt-2 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
