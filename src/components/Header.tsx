import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mountain, Linkedin, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Use the same mobile detection logic as Hero component
    const viewportWidth = window.innerWidth;
    const screenWidth = window.screen.width;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Detect if zoomed (viewport much smaller than screen)
    const isZoomed = viewportWidth < (screenWidth / devicePixelRatio) * 0.8;
    
    // Primary mobile detection
    const isMobileSize = viewportWidth < 768;
    
    // Secondary detection for tablets/zoomed desktop
    const isTabletOrZoomed = viewportWidth < 1024 && (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      isZoomed
    );
    
    const isMobile = isMobileSize || isTabletOrZoomed;
    
    if (isMobile) {
      // On mobile, dispatch a custom event that the Index component can handle
      const event = new CustomEvent('openAccordionSection', { 
        detail: { sectionId } 
      });
      window.dispatchEvent(event);
      setIsMenuOpen(false);
      return;
    }
    
    // Default behavior for desktop
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">Giovanni Doni</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-accent transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Contact
            </button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(import.meta.env.VITE_LINKEDIN_URL, "_blank")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="accent"
                size="sm"
                asChild
              >
                <a href={`mailto:${import.meta.env.VITE_EMAIL}`}>
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-medium">
            <nav className="flex flex-col p-4 space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-foreground hover:text-accent transition-colors"
              >
                Contact
              </button>
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(import.meta.env.VITE_LINKEDIN_URL, "_blank")}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  asChild
                >
                  <a href={`mailto:${import.meta.env.VITE_EMAIL}`}>
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;