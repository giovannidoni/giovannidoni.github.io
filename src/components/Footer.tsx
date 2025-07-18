
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Linkedin, Mail, Heart, Code, Coffee } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Working URLs - replace these with your actual URLs
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/giovanni-doni";
  const emailAddress = import.meta.env.VITE_EMAIL || "giovanni.doni@example.com";

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: linkedinUrl, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${emailAddress}`, label: "Email" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (href: string) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-gradient-mountain text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Mountain className="h-8 w-8 text-accent" />
                <span className="text-2xl font-bold">Giovanni Doni</span>
              </div>
              <p className="text-white/80 max-w-md">
                Senior ML and AI Engineer bridging the precision of Alpine adventures with 
                the innovation of machine learning. Building scalable solutions that matter.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Mountain className="h-3 w-3 mr-1" />
                  London-based
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Code className="h-3 w-3 mr-1" />
                  ML and AI Engineer
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-white/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start p-0 h-auto text-white/80 hover:text-accent"
                    onClick={() => handleSocialClick(social.href)}
                  >
                    <social.icon className="h-4 w-4 mr-2" />
                    {social.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start p-0 h-auto text-white/80 hover:text-accent"
                  onClick={() => scrollToSection("#contact")}
                >
                  <Coffee className="h-4 w-4 mr-2" />
                  Coffee Chat
                </Button>
                
                {/* LinkedIn Follow Button */}
                <a
                  href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=giovanni-doni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-center items-center p-2 text-center text-white bg-[#0A66C2] w-[200px] h-8 rounded-2xl font-medium text-sm hover:bg-[#004182] transition-colors"
                >
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span>© {currentYear} Giovanni Doni. Built with</span>
                <Heart className="h-4 w-4 text-red-400" />
                <span>and React in London</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <span>Hosted on GitHub Pages</span>
                <span>•</span>
                <span>Minimal tracking</span>
                <span>•</span>
                <span>Privacy focused</span>
              </div>
            </div>
          </div>

          {/* Back to Mountains */}
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm italic">
              "There is plenty of room at the top."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
