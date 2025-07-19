import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mountain, Calendar, FileText } from "lucide-react";
const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/6069157c-16af-41e6-a698-637aa684d8eb.png')`
    }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">
              <Mountain className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2 flex-shrink-0" />
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Giovanni{" "}
              <span className="bg-gradient-to-r from-accent to-earth-warm bg-clip-text text-transparent">
                Doni
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Passionate end-to-end data professional, delivering ML and AI solutions that scale. 
              Bringing precision and innovation to complex technical challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" onClick={() => scrollToSection("experience")} className="shadow-strong">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-6 border border-white/20">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">£20M+</div>
              <div className="text-xs md:text-sm text-white/80 leading-tight">Cost Savings Delivered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-6 border border-white/20">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">10+</div>
              <div className="text-xs md:text-sm text-white/80 leading-tight">Years at Scale</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-6 border border-white/20">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">PhD</div>
              <div className="text-xs md:text-sm text-white/80 leading-tight">Physics, King's College</div>
            </div>
          </div>
        </div>

      </div>
    </section>;
};
export default Hero;