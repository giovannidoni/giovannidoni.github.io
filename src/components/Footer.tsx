
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Linkedin, Mail, Heart, Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Working URLs - replace these with your actual URLs
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const emailAddress = import.meta.env.VITE_EMAIL;

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
    <footer className="bg-gradient-mountain text-white py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
              <div className="flex flex-col space-y-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start p-0 h-auto text-white/80 hover:text-accent w-fit"
                    onClick={() => handleSocialClick(social.href)}
                  >
                    <social.icon className="h-4 w-4 mr-2" />
                    {social.label}
                  </Button>
                ))}
                
                {/* RSS Feed */}
                <a 
                  href="/rss/feed.xml" 
                  target="_blank"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm"
                >
                  <Code className="h-4 w-4 mr-2" />
                  RSS Feed
                </a>
                
                {/* LinkedIn Follow Button */}
                <div className="pt-2">
                  <a
                    href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=giovanni-doni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center text-white bg-[#0A66C2] w-[200px] h-10 leading-10 rounded-2xl font-medium text-sm hover:bg-[#004182] transition-colors"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white/60 text-sm text-center">
                <span>© {currentYear} Giovanni Doni.</span>
                <div className="flex items-center gap-1">
                  <span>Built with</span>
                  <Heart className="h-4 w-4 text-red-400" />
                  <span>and React in London</span>
                </div>
              </div>
              
              <div className="flex flex-row items-center gap-6 text-sm text-white/60 text-center">
                <span>Hosted on GitHub Pages</span>
                <span>•</span>
                <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              </div>
              
              <p className="text-white/60 text-sm italic text-center">
                "There is plenty of room at the top."
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
