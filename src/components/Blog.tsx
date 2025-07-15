import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight, Calendar, Tag, Linkedin, ExternalLink } from "lucide-react";

const Blog = () => {
  // Placeholder blog posts - these would come from a CMS or markdown files
  const blogPosts = [
    {
      title: "Scaling LLMs in Production: Lessons from Deliveroo",
      excerpt: "A deep dive into the challenges and solutions for deploying large language models at scale in production environments.",
      date: "2024-01-15",
      readTime: "8 min",
      tags: ["LLMs", "Production", "MLOps"],
      slug: "scaling-llms-production-deliveroo"
    },
    {
      title: "From the Dolomites to Data: What Mountains Teach Us About ML",
      excerpt: "Drawing parallels between mountain climbing and machine learning - patience, preparation, and the importance of taking one step at a time.",
      date: "2023-12-20",
      readTime: "5 min",
      tags: ["Career", "Philosophy", "Mountains"],
      slug: "dolomites-data-mountains-ml"
    },
    {
      title: "Building Robust ML Pipelines with Kubernetes and Argo",
      excerpt: "A practical guide to orchestrating machine learning workflows using modern container orchestration tools.",
      date: "2023-11-28",
      readTime: "12 min",
      tags: ["Kubernetes", "MLOps", "Infrastructure"],
      slug: "robust-ml-pipelines-kubernetes-argo"
    }
  ];

  // LinkedIn posts - these would come from LinkedIn API or manual curation
  const linkedinPosts = [
    {
      title: "The Future of ML Engineering: From Models to Production",
      excerpt: "Just deployed our latest LLM system at scale. Here's what I learned about the gap between research and production...",
      date: "2024-01-20",
      engagement: "127 likes, 23 comments",
      tags: ["MLOps", "Production", "Engineering"],
      url: "https://linkedin.com/posts/yourprofile/activity-123456789",
      type: "linkedin"
    },
    {
      title: "Leadership Lessons from 8000ft: Managing Remote ML Teams",
      excerpt: "Back from the Alps with fresh perspectives on leading distributed teams. The parallels between mountain leadership and tech leadership are striking...",
      date: "2024-01-10",
      engagement: "89 likes, 15 comments",
      tags: ["Leadership", "Remote Work", "Mountains"],
      url: "https://linkedin.com/posts/yourprofile/activity-123456790",
      type: "linkedin"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Blog
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Insights & 
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                {" "}Perspectives
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sharing thoughts on machine learning, technical leadership, and the intersection 
              of technology with life experiences. From Alpine adventures to production ML systems.
            </p>
          </div>

          {/* Latest LinkedIn Posts */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Linkedin className="h-5 w-5 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Latest LinkedIn Posts</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {linkedinPosts.map((post, index) => (
                <Card key={`linkedin-${index}`} className="p-6 hover:shadow-medium transition-all duration-300 group cursor-pointer border-l-4 border-l-accent/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </Badge>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-muted-foreground">{post.engagement}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group-hover:text-accent transition-colors"
                        onClick={() => window.open(post.url, '_blank')}
                      >
                        View on LinkedIn
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Blog Articles */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Featured Articles</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 group cursor-pointer">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group-hover:text-accent transition-colors"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-foreground mb-4">
                More Articles Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm currently working on more in-depth articles about ML engineering, 
                technical leadership, and the intersection of outdoor adventures with professional growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="accent" size="lg">
                  <BookOpen className="h-5 w-5" />
                  Subscribe for Updates
                </Button>
                <Button variant="outline" size="lg">
                  Suggest a Topic
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;