import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Trophy, ExternalLink, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Experience = () => {
  const experiences = [
    {
      company: "Zenvi",
      role: "Founding Tech Lead",
      period: "June 2025 - Present",
      location: "London, UK (remote)",
      description: "Founding Tech Lead / Head of AI, owning the technical and analytical foundations of Zenvi from zero to first product.",
      achievements: [
        "Shaped the core business model by translating unit economics, market constraints, and regulatory structure into optimisation and decision frameworks",
        "Designed and implemented optimisation models for battery-portfolio dispatch and value stacking across flexibility markets",
        "Built the initial ML/AI architecture, including evaluation pipelines and production-ready foundations",
        "Delivered an end-to-end proof of concept for an agent-based automation product, covering extraction, reasoning, and retrieval",
        "Took full ownership of technical direction under extreme ambiguity, operating pre-revenue and pre-team"
      ],
      tech: ["Python", "Pyomo", "OR-Tools", "vLLM", "AWS", "Docker", "Terraform", "MLOps"]
    },
    {
      company: "Deliveroo",
      role: "Senior Machine Learning Engineer",
      period: "Feb 2021 - Present",
      location: "London, UK",
      description: "Deliveroo needed scalable logistics optimization. Decision: Led ML/AI initiatives and owned advanced solution delivery. Outcome: Shipped systems that transformed business impact.",
      achievements: [
        "Fine-tuned and deployed LLMs and visual transformers for attribute extraction",
        "Developed ML/AI models for network optimization achieving £20M+ in cost savings",
        "Built and maintained production ML/AI systems serving millions of users",
        "Mentored senior ICs and coordinated cross-team initiatives",
        "Expertise in microservices architecture and real-time streaming systems"
      ],
      tech: ["Python", "TensorFlow", "AWS", "Kubernetes", "Spark", "MLOps"]
    },
    {
      company: "SUPSI",
      role: "Research Advisor",
      period: "Mar 2020 - Feb 2022",
      location: "Switzerland",
      description: "Materials research required modern data science. Decision: Applied advanced ML/AI and bridged academic and industry standards. Outcome: Delivered research and mentored teams to success.",
      achievements: [
        "Applied density-based clustering to high-dimensional molecular descriptors",
        "Published research in high-impact journals on self-assembling polymers",
        "Mentored PhD students in modern data science frameworks",
        "Established industry-standard ML/AI practices in academic environment"
      ],
      tech: ["Python", "Scikit-learn", "Research", "Publications"]
    },
    {
      company: "Tesco",
      role: "Senior Machine Learning Engineer",
      period: "Jul 2018 - Sep 2020",
      location: "London, UK",
      description: "Tesco's £300M unit needed ML/AI-driven pricing. Decision: Architected and led delivery of scalable optimization solutions. Outcome: Improved profit and system performance at scale.",
      achievements: [
        "Led development of ML/AI-powered price recommendation service",
        "Integrated ML/AI models with mixed-integer optimizers on distributed infrastructure",
        "Achieved 1%+ increase in retained profit across business unit",
        "Optimized ETL pipelines achieving 5x performance improvement",
        "Built scalable solutions on on-premise Hadoop clusters"
      ],
      tech: ["Python", "Hadoop", "Spark", "Optimization", "ETL", "Distributed Systems"]
    },
    {
      company: "SCL Elections",
      role: "Senior Data Scientist",
      period: "Aug 2015 - May 2018",
      location: "London, UK",
      description: "High-stakes projects in politics and enterprise. Decision: Led predictive modeling and owned delivery across sectors. Outcome: Shipped ML/AI solutions for analytics, insurance, and litigation.",
      achievements: [
        "Built ML/AI models for £10M+ worth of complex data-intensive projects",
        "Worked on 2016 US Presidential Elections analytics",
        "Delivered solutions across insurance, healthcare, and patent litigation"
      ],
      tech: ["Python", "R", "Predictive Modeling", "Statistics", "Consulting"]
    }
  ];

  const education = [
    {
      degree: "PhD in Physics",
      institution: "King's College London",
      period: "2011 - 2015",
      details: "ESRC Research Grant & British Petroleum Sponsorship"
    },
    {
      degree: "MSc Material Engineering",
      institution: "University of Trieste",
      period: "2008 - 2011",
      details: "First Class Honours (110/110)"
    },
    {
      degree: "BSc Industrial Engineering",
      institution: "University of Trieste",
      period: "2004 - 2007",
      details: "First Class Honours (110/110)"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Building2 className="h-4 w-4 mr-2" />
              Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Proven Track Record of{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Delivering Impact
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From startups to scale-ups, academic research to production systems. 
              Here's how I've driven measurable results across diverse technical challenges.
            </p>
          </div>

          {/* Professional Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8">Professional Journey</h3>
            <Accordion type="multiple" className="space-y-4">
              {experiences.map((exp, index) => (
                <AccordionItem key={index} value={`experience-${index}`} className="border rounded-lg border-l-4 border-l-accent">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full text-left">
                      <div className="lg:flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-xl font-bold text-foreground">{exp.role}</h4>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                          <span className="font-semibold text-accent">{exp.company}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      <p className="text-muted-foreground">{exp.description}</p>
                      
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-accent" />
                            Key Achievements
                          </h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0"></span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-foreground mb-3">Technologies</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Education</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 text-center">
                  <h4 className="font-bold text-foreground mb-2">{edu.degree}</h4>
                  <p className="text-accent font-medium mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                  <p className="text-xs text-muted-foreground">{edu.details}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;