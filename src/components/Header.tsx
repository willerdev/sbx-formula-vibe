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
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative z-10">
                <img 
                  src="/lovable-uploads/895b4305-b1a8-42d2-9076-a517d95d9601.png" 
                  alt="Savii Banks FX Group Logo" 
                  className="w-14 h-14 sm:w-18 sm:h-18 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-poppins font-bold text-lg sm:text-xl text-white">SAVII BANKS</div>
                <div className="font-poppins font-semibold text-xs sm:text-sm text-primary -mt-1">FX GROUP</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium">
                Signals
              </a>
              <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium">
                Mentorship
              </a>
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="hero" size="sm" asChild>
                <a href="/signup">Login</a>
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
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Signals
                </a>
                <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Mentorship
                </a>
                <div className="px-4 pt-2">
                  <Button variant="hero" size="sm" className="w-full" asChild>
                    <a href="/signup">Login</a>
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