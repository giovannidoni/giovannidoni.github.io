import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen, Clock, ArrowRight, Calendar, Tag, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import linkedinPostsData from "@/data/linkedin-posts.json";
import blogArticlesData from "@/data/blog-articles.json";

const Blog = () => {
  // Blog articles loaded from JSON file
  const blogPosts = blogArticlesData;

  // LinkedIn posts loaded from JSON file
  const linkedinPosts = linkedinPostsData.sort((a, b) => a.index - b.index);

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
              of technology with life experiences. Peak performance in your team and in your production systems.
            </p>
          </div>

          {/* Latest LinkedIn Posts */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Linkedin className="h-5 w-5 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Latest LinkedIn Posts</h3>
            </div>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {linkedinPosts.map((post, index) => (
                  <CarouselItem key={`linkedin-${index}`} className="basis-full md:basis-1/2">
                    <Card className="p-4 h-full">
                      <div className="flex justify-center">
                        <div 
                          className="linkedin-embed w-full max-w-[504px] [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:h-auto [&_iframe]:min-h-[400px] sm:[&_iframe]:min-h-[500px]"
                          dangerouslySetInnerHTML={{ __html: post.embedCode }}
                        />
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Blog Articles */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Featured Articles</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Link key={index} to={`/blog/${post.slug}`}>
                  <Card className="p-6 hover:shadow-medium transition-all duration-300 group cursor-pointer h-full">
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
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Blog;
