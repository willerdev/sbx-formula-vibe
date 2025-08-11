import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Main header */}
      <header className="w-full bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-all duration-300">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 py-2">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/da38fccb-9157-47cb-9d6b-00ce2bb4711b.png" 
                  alt="Savii Banks FX Group Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                About
              </a>
              <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                Signals
              </a>
              <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                Mentorship
              </a>
              <a href="#faqs" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                FAQs
              </a>
              <a href="#register" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                Register
              </a>
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="hero" size="sm" asChild>
                <a href="/login">Login</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  About
                </a>
                <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Signals
                </a>
                <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Mentorship
                </a>
                <a href="#faqs" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  FAQs
                </a>
                <a href="#register" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Register
                </a>
                <div className="px-4 pt-2">
                  <Button variant="hero" size="sm" className="w-full" asChild>
                    <a href="/login">Login</a>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};