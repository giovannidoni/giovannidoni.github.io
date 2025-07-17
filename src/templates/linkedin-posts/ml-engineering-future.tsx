import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const MLEngineeringFuturePost = () => {
  // You can manually edit the iframe code below
  const linkedinEmbedCode = `
    <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7339301481948311552?collapsed=1" height="552" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
  `;

  const postData = {
    title: "The Future of ML Engineering: From Models to Production",
    excerpt: "Just deployed our latest LLM system at scale. Here's what I learned about the gap between research and production...",
    date: "2024-01-20",
    engagement: "127 likes, 23 comments",
    tags: ["MLOps", "Production", "Engineering"],
    url: "https://linkedin.com/posts/yourprofile/activity-123456789"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/#blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card className="p-8">
            {/* Post header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(postData.date)}
                </span>
                <Badge variant="outline" className="text-xs">
                  <Linkedin className="h-3 w-3 mr-1" />
                  LinkedIn Post
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {postData.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {postData.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {postData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button 
                variant="accent" 
                onClick={() => window.open(postData.url, '_blank')}
                className="mb-8"
              >
                View Original on LinkedIn
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* LinkedIn embed */}
            <div className="flex justify-center">
              <div 
                className="linkedin-embed"
                dangerouslySetInnerHTML={{ __html: linkedinEmbedCode }}
              />
            </div>

            {/* Engagement info */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                {postData.engagement}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MLEngineeringFuturePost;