import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mountain, Calendar, FileText } from "lucide-react";
import AIResearchDigest from "@/components/AIResearchDigest";
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
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/6069157c-16af-41e6-a698-637aa684d8eb.png')`
    }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          
          {/* AI Research Digest */}
          <div className="mb-6">
            <AIResearchDigest />
          </div>
          
          <div className="space-y-3 md:space-y-4">
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Passionate end-to-end data professional, delivering ML and AI solutions that scale. 
              Bringing precision and innovation to complex technical challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" onClick={() => {console.log('Button clicked!'); scrollToSection("experience");}} className="shadow-strong">
              <FileText className="h-5 w-5" />
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" onClick={() => scrollToSection("contact")}>
              <Calendar className="h-5 w-5" />
              Let's Chat
            </Button>
          </div>

          {/* LinkedIn Follow Button */}
          <div className="flex justify-center mt-4 md:mt-6">
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=giovanni-doni"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center p-2 text-center text-white bg-[#0A66C2] w-[200px] h-8 rounded-2xl font-medium text-sm hover:bg-[#004182] transition-colors shadow-medium"
            >
              Follow on LinkedIn
            </a>
          </div>

        </div>

      </div>
    </section>;
};
export default Hero;