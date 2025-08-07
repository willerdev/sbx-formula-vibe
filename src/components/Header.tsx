import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary/30 text-muted-foreground text-xs sm:text-sm py-2 px-3 sm:px-4 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">support@saviibanks.com</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4 hover:text-primary cursor-pointer transition-colors" />
            <Youtube className="w-3 h-3 sm:w-4 sm:h-4 hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="w-3 h-3 sm:w-4 sm:h-4 hover:text-primary cursor-pointer transition-colors" />
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 hover:text-primary cursor-pointer transition-colors" />
          </div>
          <span className="text-xs hidden sm:inline truncate">Official website: saviibanks.com. Beware of fakes!</span>
          <span className="text-xs sm:hidden truncate">saviibanks.com</span>
        </div>
      </div>

      {/* Main header */}
      <header className="w-full bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-primary/20 p-1 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3856dbbc-7e0f-4eaa-b08c-dbc1198e4ade.png" 
                  alt="Savii Banks FX Group Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="font-poppins font-bold text-lg sm:text-xl">
                <div className="text-primary">SAVII BANKS</div>
                <div className="text-muted-foreground text-xs">FX GROUP</div>
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