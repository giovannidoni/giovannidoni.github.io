import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import blogArticles from '@/data/blog-articles.json';

// Import markdown files directly
import scalingLlmsContent from '@/data/blog-posts/scaling-llms-production-deliveroo.md?raw';
import dolomitesContent from '@/data/blog-posts/dolomites-data-mountains-ml.md?raw';
import kubernetesContent from '@/data/blog-posts/robust-ml-pipelines-kubernetes-argo.md?raw';
import fittingIntelligenceContent from '@/data/blog-posts/fitting-intelligence.md?raw';

// Create a mapping of content files to their imported content
const contentMap: Record<string, string> = {
  'scaling-llms-production-deliveroo.md': scalingLlmsContent,
  'dolomites-data-mountains-ml.md': dolomitesContent,
  'robust-ml-pipelines-kubernetes-argo.md': kubernetesContent,
  'fitting-intelligence.md': fittingIntelligenceContent,
};

interface BlogArticle {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  contentFile: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArticle = blogArticles.find((article: BlogArticle) => article.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Get markdown content from static imports
      const markdownContent = contentMap[foundArticle.contentFile];
      if (markdownContent) {
        setContent(markdownContent);
      } else {
        console.error('Markdown content not found for:', foundArticle.contentFile);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-32"></div>
            <div className="h-12 bg-muted rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/#blog" className="inline-flex items-center text-foreground/70 hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <Card className="bg-card backdrop-blur-sm border-border p-8">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-secondary text-secondary-foreground border-border"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <article className="prose prose-lg max-w-none">
            <div className="text-foreground space-y-6">
              <ReactMarkdown 
                components={{
                  h1: () => null, // Skip h1 since we show title from metadata
                  h2: ({children}) => <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>,
                  p: ({children}) => <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-outside space-y-2 mb-4 text-foreground/90 pl-6">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-outside space-y-2 mb-4 text-foreground/90 pl-6">{children}</ol>,
                  li: ({children}) => <li className="text-foreground/90">{children}</li>,
                  strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                  code: ({children}) => <code className="bg-muted text-foreground px-2 py-1 rounded text-sm">{children}</code>,
                  pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                  a: ({children, href}) => <a href={href} className="text-primary hover:text-primary/80 underline">{children}</a>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground mb-4">{children}</blockquote>,
                  img: ({src, alt}) => <div className="flex justify-center my-6"><img src={src} alt={alt} className="max-w-full h-auto rounded-lg" /></div>
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;