import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-smooth">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center p-3">
              <img 
                src="/lovable-uploads/0dee6bf3-cdaa-4119-b213-6b1bcca45e21.png" 
                alt="Savii Banks FX Group Logo" 
                className="h-[60px] w-auto object-contain drop-shadow-lg lg:h-[60px] md:h-[44px] transition-smooth"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15)) drop-shadow(0 0 12px hsl(var(--primary) / 0.2))'
                }}
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
              <a href="#register" className="text-foreground hover:text-primary transition-fast font-medium text-sm">
                Register
              </a>
            </div>
          </nav>

          {/* Login Button - Right */}
          <div className="hidden lg:flex items-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 font-medium transition-fast shadow-lg hover:shadow-xl"
              asChild
            >
              <a href="/login">Login</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              <a href="#about" className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg">
                About
              </a>
              <a href="#signals" className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg">
                Signals
              </a>
              <a href="#mentorship" className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg">
                Mentorship
              </a>
              <a href="#faqs" className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg">
                FAQs
              </a>
              <a href="#register" className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg">
                Register
              </a>
              <div className="px-4 pt-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-2 font-medium transition-fast"
                  asChild
                >
                  <a href="/login">Login</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};