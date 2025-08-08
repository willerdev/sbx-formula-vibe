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
      <header className="w-full bg-black backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black flex items-center justify-center rounded-xl border border-gray-700/50">
                <img 
                  src="/lovable-uploads/502cf9d6-18f6-4fe4-9cf7-d6c8c7812f62.png" 
                  alt="Savii Banks FX Group Logo" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="font-poppins font-bold text-2xl sm:text-3xl">
                <div className="text-white">SAVII BANKS</div>
                <div className="text-gray-400 text-lg">FX GROUP</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12 lg:space-x-16">
              <a href="#signals" className="text-white hover:text-primary transition-colors font-medium text-lg lg:text-xl">
                Signals
              </a>
              <a href="#mentorship" className="text-white hover:text-primary transition-colors font-medium text-lg lg:text-xl">
                Mentorship
              </a>
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="hero" size="lg" className="px-8 py-3 text-base font-semibold" asChild>
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