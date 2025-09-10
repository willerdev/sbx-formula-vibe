import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-background/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 transition-smooth">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Section - Account (if logged in) + Logo */}
          <div className="flex items-center gap-4">
            {/* Account Dropdown - Left Corner */}
            {user && (
              <div className="hidden lg:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 font-medium transition-fast shadow-lg hover:shadow-xl">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Logo */}
            <a href="/" className="flex items-center px-2 py-2 gap-3">
              <img 
                src="/lovable-uploads/f5c45cc3-ee68-426b-b25c-762724962b16.png" 
                alt="SBX Logo" 
                className="h-[60px] w-auto object-contain lg:h-[60px] md:h-[50px] sm:h-[45px]"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(255,215,0,0.3))'
                }}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm lg:text-base">SAVII BANKS</span>
                <span className="text-yellow-400 font-semibold text-xs lg:text-sm text-center">FX GROUP</span>
              </div>
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

          {/* Right Section - Login (if not logged in) */}
          <div className="hidden lg:flex items-center">
            {!user && (
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
            {/* Mobile Account for logged in users */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-primary hover:bg-primary/10"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
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
              <a 
                href="#register" 
                className="text-foreground hover:text-primary hover:bg-muted transition-fast font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </a>
              
              {/* Mobile Login for non-logged in users */}
              {!user && (
                <div className="px-4 pt-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-3 font-medium transition-fast"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};