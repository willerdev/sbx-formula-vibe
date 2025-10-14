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
    <header className="w-full bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <img 
                src={logoTransparent} 
                alt="Savii Banks FX Group Logo" 
                className="h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-12">
            <div className="flex items-center space-x-10">
              <a href="#about" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-base tracking-wide relative group">
                <span className="relative">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              <a href="#signals" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-base tracking-wide relative group">
                <span className="relative">
                  Signals
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              <a href="#mentorship" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-base tracking-wide relative group">
                <span className="relative">
                  Mentorship
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
              <a href="/dashboard" className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium text-base tracking-wide relative group">
                <span className="relative">
                  Account Management
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </div>
          </nav>

          {/* Right Section - CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost"
              className="text-foreground/80 hover:text-primary hover:bg-primary/5 font-medium px-5 py-2 transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            {user ? (
              <Button 
                variant="hero"
                size="lg"
                className="px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                variant="hero"
                size="lg"
                className="px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" /> 
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-xl">
            <nav className="flex flex-col space-y-2">
              <a 
                href="#about" 
                className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#signals" 
                className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Signals
              </a>
              <a 
                href="#mentorship" 
                className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Mentorship
              </a>
              <a 
                href="/dashboard" 
                className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Account Management
              </a>
              
              <div className="h-px bg-border/50 my-2"></div>
              
              {/* Mobile CTA Buttons */}
              <div className="px-6 pt-2 space-y-3">
                <Button 
                  variant="outline"
                  className="w-full py-3 font-medium border-border/50 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                  onClick={() => {
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                {user ? (
                  <Button 
                    variant="hero"
                    size="lg"
                    className="w-full py-3 font-medium shadow-lg"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    variant="hero"
                    size="lg"
                    className="w-full py-3 font-medium shadow-lg"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Started
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