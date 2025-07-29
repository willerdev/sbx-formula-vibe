import { Instagram, Youtube, Twitter, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-primary/20 animate-fade-in bg-transparent">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Social Links */}
          <div className="space-y-6">
            <div>
              <h3 className="font-poppins font-bold text-2xl">
                <span className="text-primary">SAVII BANKS</span> <span className="text-muted-foreground">FX GROUP</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-2">SBX Formula</p>
            </div>
            
            <div className="space-y-4">
              <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-6">Quick Link</h4>
            <div className="space-y-4">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">YouTube</a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-6">Useful Links</h4>
            <div className="space-y-4">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Account Management</a>
              <a href="/signup" className="block text-muted-foreground hover:text-primary transition-colors">Login</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Register</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Faq</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="text-muted-foreground">
                  <p>Kigali KK 200St</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:support@sbxformula.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@sbxformula.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+250788974179" className="text-muted-foreground hover:text-primary transition-colors">
                  +250 788 974 179
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            Copyright 2021 - 2025 © Savii Banks Fx Group.
          </p>
        </div>
      </div>
    </footer>
  );
};