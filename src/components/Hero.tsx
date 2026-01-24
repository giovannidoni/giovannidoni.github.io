import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mountain, Calendar, FileText, Linkedin } from "lucide-react";
import AIResearchDigest from "@/components/AIResearchDigest";
import profilePicture from "@/assets/profile-picture.png";
const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    // Use the same mobile detection logic as Index component
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
    
    console.log('scrollToSection called with:', sectionId, 'isMobile:', isMobile);
    
    if (isMobile) {
      // On mobile, dispatch a custom event that the Index component can handle
      console.log('Dispatching openAccordionSection event for:', sectionId);
      const event = new CustomEvent('openAccordionSection', { 
        detail: { sectionId } 
      });
      window.dispatchEvent(event);
      return;
    }
    
    // Default behavior for desktop or other sections
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        role="img"
        aria-label="Giovanni Doni professional background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/assets/6069157c-16af-41e6-a698-637aa684d8eb.webp')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">

          <div className="space-y-3 md:space-y-4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <img 
                  src={profilePicture}
                  alt="Giovanni Doni - Tech Lead, Machine Learning & AI"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-strong"
              />
            </div>

              <h1 className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-bold">
                Tech Lead building ML/AI systems from problem framing to production
              </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-white text-primary border-2 border-white hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-strong w-40" onClick={() => {console.log('Button clicked!'); scrollToSection("experience");}}>
              <FileText className="h-5 w-5" />
              My Work
            </Button>
            <Button variant="accent" size="lg" onClick={() => scrollToSection("contact")} className="shadow-strong w-40">
              <Calendar className="h-5 w-5" />
              Let's Chat
            </Button>
          </div>

          {/* LinkedIn Follow Button */}
          <div className="flex justify-center mt-4 md:mt-6">
            <a
              href="https://www.linkedin.com/in/giovanni-doni"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center w-12 h-12 bg-[#0A66C2] rounded-full hover:bg-[#004182] transition-colors shadow-medium"
              aria-label="Follow on LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-white fill-white" />
            </a>
          </div>

          {/* AI Research Digest */}
          <div className="mt-6">
            <AIResearchDigest />
          </div>

        </div>

      </div>
    </section>;
};
export default Hero;