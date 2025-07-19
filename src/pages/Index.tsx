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
      // Use both viewport width and device characteristics for better mobile detection
      const isMobileViewport = window.innerWidth < 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isZoomedMobile = window.innerWidth < 1024 && isTouchDevice;
      
      setIsMobile(isMobileViewport || isZoomedMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
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
