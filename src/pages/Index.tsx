import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, User, Briefcase, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

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
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    // Also check on visibility change (handles zoom better)
    document.addEventListener('visibilitychange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
      document.removeEventListener('visibilitychange', checkMobile);
    };
  }, []);

  if (!isMobile) {
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
      
      {/* Mobile Accordion Layout */}
      <div className="bg-background">
        <Accordion type="multiple" defaultValue={["contact"]} className="w-full">
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
