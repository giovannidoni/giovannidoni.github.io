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
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/6069157c-16af-41e6-a698-637aa684d8eb.png')`
    }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Mountain className="h-4 w-4 mr-2" />
              Senior ML and AI Engineer • PhD • Tech Professional
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Giovanni{" "}
              <span className="bg-gradient-to-r from-accent to-earth-warm bg-clip-text text-transparent">
                Doni
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
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
              Book a Call
            </Button>
          </div>

          {/* LinkedIn Follow Button */}
          <div className="flex justify-center mt-6">
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=giovanni-doni"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center p-2 text-center text-white bg-[#0A66C2] w-[200px] h-8 rounded-2xl font-medium text-sm hover:bg-[#004182] transition-colors shadow-medium"
            >
              Follow on LinkedIn
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent">£20M+</div>
              <div className="text-sm text-white/80">Cost Savings Delivered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent">10+</div>
              <div className="text-sm text-white/80">Years at Scale</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-accent">PhD</div>
              <div className="text-sm text-white/80">Physics, King's College</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection("about")} className="text-white/70 hover:text-white transition-colors">
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>;
};
export default Hero;