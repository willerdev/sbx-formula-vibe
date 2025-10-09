import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logoTransparent from "@/assets/logo-transparent.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-smooth">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-32 lg:h-36">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-4">
            
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src={logoTransparent} 
                alt="Savii Banks FX Group Logo" 
                className="h-32 w-auto object-contain"
              />
            </a>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-fast font-medium text-sm">
                About
              </a>
              <a href="#signals" className="text-foreground hover:text-primary transition-fast font-medium text-sm">
                Signals
              </a>
              <a href="#mentorship" className="text-foreground hover:text-primary transition-fast font-medium text-sm">
                Mentorship
              </a>
              <a href="#faqs" className="text-foreground hover:text-primary transition-fast font-medium text-sm">
                FAQs
              </a>
              <button 
                onClick={() => navigate("/auth")} 
                className="text-foreground hover:text-primary transition-fast font-medium text-sm"
              >
                Register
              </button>
            </div>
          </nav>

          {/* Right Section - Dashboard/Login */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 font-medium transition-fast shadow-lg hover:shadow-xl"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 font-medium transition-fast shadow-lg hover:shadow-xl"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              <a 
                href="#about" 
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#signals" 
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Signals
              </a>
              <a 
                href="#mentorship" 
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Mentorship
              </a>
              <a 
                href="#faqs" 
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </a>
              <button 
                onClick={() => {
                  navigate("/auth");
                  setIsMenuOpen(false);
                }}
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg text-left w-full"
              >
                Register
              </button>
              
              {/* Mobile Dashboard/Login */}
              <div className="px-4 pt-4">
                {user ? (
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-3 font-medium transition-fast"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-3 font-medium transition-fast"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};