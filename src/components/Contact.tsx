import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Linkedin, MessageSquare, MapPin, Coffee, Mountain, Clock } from "lucide-react";

const Contact = () => {
  const services = [
    {
      title: "ML Strategy Consulting",
      description: "Strategic guidance on ML initiatives, from proof-of-concept to production deployment.",
      duration: "60 min",
      type: "Strategy Session"
    },
    {
      title: "Technical Architecture Review",
      description: "Deep dive into your ML infrastructure, identifying optimization opportunities and best practices.",
      duration: "90 min",
      type: "Technical Review"
    },
    {
      title: "Career Mentoring",
      description: "One-on-one mentoring for data scientists and ML engineers looking to advance their careers.",
      duration: "45 min",
      type: "Mentoring"
    },
    {
      title: "Speaking & Workshops",
      description: "Technical talks and workshops on ML engineering, leadership, and scaling data teams.",
      duration: "Custom",
      type: "Speaking"
    }
  ];

  const contactMethods = [
    {
      icon: Calendar,
      title: "Book a Call",
      description: "Schedule a consultation or mentoring session",
      action: "Book via Calendly",
      href: import.meta.env.VITE_CALENDLY_URL || "#calendly",
      primary: true
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Connect for professional networking",
      action: "Connect on LinkedIn",
      href: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/giovanni-doni",
      primary: false
    },
    {
      icon: Mail,
      title: "Email",
      description: "For detailed inquiries and collaborations",
      action: "Send Email",
      href: `mailto:${import.meta.env.VITE_EMAIL || 'giovanni@example.com'}`,
      primary: false
    },
    {
      icon: Coffee,
      title: "Coffee Chat",
      description: "Informal meetups in London",
      action: "Suggest a Spot",
      href: "#coffee",
      primary: false
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're looking to scale your ML initiatives, need strategic guidance, 
              or want to discuss the latest in AI over a coffee in London, I'd love to hear from you.
            </p>
          </div>

          {/* Location Banner */}
          <div className="mb-12">
            <Card className="p-6 bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
              <div className="flex items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="font-medium">Based in London</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-accent" />
                  <span className="font-medium">Heart in the Dolomites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-medium">GMT Timezone</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Services & Expertise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {service.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {service.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </span>
                      <Button variant="outline" size="sm">
                        Book Session
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center hover:shadow-medium transition-all duration-300 group cursor-pointer ${
                  method.primary ? 'ring-2 ring-accent/20 bg-gradient-to-b from-accent/5 to-accent/10' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                    method.primary ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{method.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                    <Button 
                      variant={method.primary ? "accent" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {method.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Calendly Integration Placeholder */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-hero border-accent/20">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Ready to Schedule?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Choose a time that works for you. I'm available for consultations, mentoring sessions, 
                and technical discussions. All calls are conducted with the same attention to detail 
                I bring to Alpine expeditions.
              </p>
              <div className="space-y-4">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="shadow-strong"
                  onClick={() => window.open(import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/giovanni-doni', '_blank')}
                >
                  <Calendar className="h-5 w-5" />
                  Open Calendly Scheduler
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;