import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Code2, Brain, Users, Target, Globe } from "lucide-react";

const About = () => {
  const skills = [
    { category: "ML & AI", items: ["LLMs", "Computer Vision", "NLP", "MLOps", "Deep Learning"] },
    { category: "Infrastructure", items: ["AWS", "Kubernetes", "Docker", "Terraform", "Spark"] },
    { category: "Languages", items: ["Python", "SQL", "Scala", "R", "TypeScript"] },
    { category: "Frameworks", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "Argo"] },
  ];

  const values = [
    {
      icon: Brain,
      title: "Technical Excellence",
      description: "Deep expertise in ML and AI and data science, from research to production deployment."
    },
    {
      icon: Users,
      title: "Collaborative Leadership",
      description: "Mentoring teams and driving cross-functional initiatives that scale impact."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Proven track record of delivering £20M+ in measurable business value."
    },
    {
      icon: Mountain,
      title: "Resilient Mindset",
      description: "Like conquering peaks, I thrive on complex challenges and continuous growth."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Globe className="h-4 w-4 mr-2" />
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Peak Performance in{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                AI / Machine Learning
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Innovation that climbs. Honed precision delivering peak‑performance through ML/AI.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">My Journey</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  With a PhD in Physics from King's College London and over 5 years of hands-on 
                  experience at companies like Deliveroo and Tesco, I've developed a unique perspective 
                  on turning complex data into actionable insights.
                </p>
                <p>
                  From optimizing delivery networks that save millions to fine-tuning LLMs for 
                  production systems, I specialize in the full ML and AI lifecycle - from research and 
                  experimentation to deployment and monitoring.
                </p>
                <p>
                  When I'm not building ML and AI pipelines, you'll find me exploring mountains, 
                  training for ultramarathons, or discovering new places. This passion 
                  for exploration and endurance directly informs my approach to tackling 
                  technical challenges.
                </p>
              </div>
            </div>

            <div 
              className="rounded-2xl shadow-strong h-96 bg-cover bg-center"
              style={{
                backgroundImage: `url('/lovable-uploads/d96abb46-95d6-4380-b1cc-4c796f725182.png')`
              }}
            />
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {values.map((value, index) => (
              <Card key={index} className="p-4 md:p-6 text-center hover:shadow-medium transition-all duration-300 group">
                <div className="mb-4">
                  <value.icon className="h-8 w-8 text-accent mx-auto group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Technical Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="p-4 md:p-6 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Code2 className="h-5 w-5 text-accent mr-2" />
                    <h4 className="font-semibold text-foreground">{skillGroup.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;