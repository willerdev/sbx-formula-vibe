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
          {/* Logo - Left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center px-2 py-2 gap-3">
              <img 
                src="/lovable-uploads/f5c45cc3-ee68-426b-b25c-762724962b16.png" 
                alt="SBX Logo" 
                className="h-[70px] w-auto object-contain lg:h-[70px] md:h-[60px] sm:h-[50px]"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(255,215,0,0.3))'
                }}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-base lg:text-lg">SAVII BANKS</span>
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

          {/* Auth Section - Right */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 font-medium transition-fast shadow-lg hover:shadow-xl">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                {user ? (
                  <div className="space-y-2">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-2 font-medium transition-fast"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full py-2 font-medium transition-fast"
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full py-2 font-medium transition-fast"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full py-2 font-medium transition-fast"
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