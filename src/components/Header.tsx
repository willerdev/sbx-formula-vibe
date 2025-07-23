import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary/30 text-muted-foreground text-sm py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>support@sbxformula.com</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Instagram className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
            <Youtube className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
            <Linkedin className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
          </div>
          <span className="text-xs">Our website is sbxformula.com. Beware of fakes!</span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                SBX
              </div>
              <div className="font-space-grotesk font-bold text-xl">
                <span className="text-gradient-primary">SBX</span>
                <span className="text-foreground"> FORMULA</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </a>
              <a href="#account" className="text-foreground hover:text-primary transition-colors font-medium">
                Account Management
              </a>
              <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium">
                Signals
              </a>
              <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium">
                Mentorship
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
                Services
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
                FAQ
              </a>
              <a href="#register" className="text-foreground hover:text-primary transition-colors font-medium">
                Register
              </a>
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="hero" size="sm">
                Login
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
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  About
                </a>
                <a href="#account" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Account Management
                </a>
                <a href="#signals" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Signals
                </a>
                <a href="#mentorship" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Mentorship
                </a>
                <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Services
                </a>
                <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  FAQ
                </a>
                <a href="#register" className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2">
                  Register
                </a>
                <div className="px-4 pt-2">
                  <Button variant="hero" size="sm" className="w-full">
                    Login
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