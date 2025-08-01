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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-4 w-32"></div>
            <div className="h-12 bg-white/10 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/#blog" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-4 w-4 text-white/60" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-white/10 text-white border-white/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/95 space-y-6">
              <ReactMarkdown 
                components={{
                  h1: () => null, // Skip h1 since we show title from metadata
                  h2: ({children}) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>,
                  p: ({children}) => <p className="text-white/90 leading-relaxed mb-4">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-outside space-y-2 mb-4 text-white/90 pl-6">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-outside space-y-2 mb-4 text-white/90 pl-6">{children}</ol>,
                  li: ({children}) => <li className="text-white/90">{children}</li>,
                  strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>,
                  code: ({children}) => <code className="bg-black/30 text-green-200 px-2 py-1 rounded text-sm">{children}</code>,
                  pre: ({children}) => <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                  a: ({children, href}) => <a href={href} className="text-blue-200 hover:text-blue-100 underline">{children}</a>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/80 mb-4">{children}</blockquote>,
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