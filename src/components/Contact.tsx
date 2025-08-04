
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Linkedin, MessageSquare, MapPin, Mountain, Clock } from "lucide-react";

const Contact = () => {

  const serviceOptions = [
    {
      title: "ML Strategy & Implementation",
      description: "End-to-end machine learning solutions from concept to production deployment"
    },
    {
      title: "Career Mentoring Sessions", 
      description: "Personal guidance for data scientists and ML engineers advancing their careers"
    },
    {
      title: "Team Leadership Consulting",
      description: "Building and scaling high-performing data science and engineering teams"
    }
  ];

  // Working URLs - replace these with your actual URLs
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const emailAddress = import.meta.env.VITE_EMAIL;

  const handleServiceBooking = () => {
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're looking to scale your ML initiatives, need strategic guidance, 
              or want to discuss the latest in AI, I'd love to hear from you.
            </p>
          </div>

          {/* Combined Contact Section */}
          <div className="max-w-5xl mx-auto">
            <Card className="p-6 md:p-8 lg:p-12 bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 border-accent/20 hover:shadow-medium transition-all duration-300">
              {/* Location Info Header */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-accent/20">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="font-medium">Based in London</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Mountain className="h-5 w-5 text-accent" />
                  <span className="font-medium">Peak performance</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-medium">GMT Timezone</span>
                </div>
              </div>

              {/* Main Contact Content */}
              <div className="text-center space-y-6 md:space-y-8">
                <button 
                  className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground flex items-center justify-center shadow-strong hover:scale-105 transition-transform cursor-pointer"
                  onClick={handleServiceBooking}
                  aria-label="Book a consultation via Calendly"
                >
                  <Calendar className="h-8 w-8 md:h-10 md:w-10" />
                </button>
                
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Book a Consultation
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
                    Strategic guidance and technical expertise across these key areas:
                  </p>
                </div>

                {/* Services Grid */}
                <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-accent/10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {serviceOptions.map((service, index) => (
                      <div key={index} className="bg-background/40 rounded-lg p-3 md:p-4 border border-accent/10 hover:border-accent/20 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-sm mt-1 flex-shrink-0" />
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground text-sm leading-tight">{service.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="flex-1 shadow-strong hover-scale text-sm md:text-base py-4 md:py-6"
                    onClick={handleServiceBooking}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule via Calendly
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex-1 border-accent/30 hover:border-accent text-sm md:text-base py-4 md:py-6"
                    onClick={() => window.open(linkedinUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
