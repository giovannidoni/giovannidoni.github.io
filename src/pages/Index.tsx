import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIResearchDigest from "@/components/AIResearchDigest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, User, Briefcase, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>(["contact"]);

  useEffect(() => {
    const checkMobile = () => {
      // More robust mobile detection that accounts for zoom
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
      
      setIsMobile(isMobileSize || isTabletOrZoomed);
    };
    
    // Handle accordion opening events from Hero component
    const handleAccordionOpen = (event: CustomEvent) => {
      const { sectionId } = event.detail;
      
      console.log('handleAccordionOpen called with:', sectionId);
      console.log('Current openAccordions:', openAccordions);
      console.log('Is mobile layout active?', isMobile);
      console.log('Accordion container exists?', document.querySelector('.accordion-container'));
      console.log('All elements with data-value:', document.querySelectorAll('[data-value]'));
      
      // Add the section to open accordions if not already open
      setOpenAccordions(prev => {
        const newAccordions = prev.includes(sectionId) ? prev : [...prev, sectionId];
        console.log('Setting openAccordions to:', newAccordions);
        return newAccordions;
      });
      
      // Wait for the accordion to open and then scroll
      setTimeout(() => {
        console.log('After timeout - checking DOM again...');
        // Fix: Use the correct Radix accordion selector
        const accordionItem = document.querySelector(`[data-state="open"][data-value="${sectionId}"]`) || 
                             document.querySelector(`[value="${sectionId}"]`) ||
                             document.querySelector(`#${sectionId}`);
        console.log('Target accordion:', accordionItem);
        
        if (accordionItem) {
          console.log('Found accordion, scrolling to:', accordionItem);
          accordionItem.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        } else {
          console.log('Still no accordion found. Trying alternative scroll...');
          // Fallback: scroll to the section container
          const container = document.querySelector('.accordion-container');
          if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 250);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    window.addEventListener('openAccordionSection', handleAccordionOpen as EventListener);
    
    // Also check on visibility change (handles zoom better)
    document.addEventListener('visibilitychange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
      window.removeEventListener('openAccordionSection', handleAccordionOpen as EventListener);
      document.removeEventListener('visibilitychange', checkMobile);
    };
  }, [openAccordions]);

  if (!isMobile) {
    console.log('Desktop mode - not rendering accordion');
    return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Blog />
        <Contact />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <div className="bg-background accordion-container">
        <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full accordion-wrapper">
          <AccordionItem value="about" className="border-b border-border/50">
            <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-accent" />
                <span className="text-lg font-semibold">About Me</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <About />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience" className="border-b border-border/50">
            <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-accent" />
                <span className="text-lg font-semibold">Experience</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <Experience />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="blog" className="border-b border-border/50">
            <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-lg font-semibold">Blog & Insights</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <Blog />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact" className="border-none">
            <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-5 w-5 text-accent" />
                <span className="text-lg font-semibold">Let's Build Something Amazing Together</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <Contact />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
