import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import blogArticles from '@/data/blog-articles.json';

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
      
      // Load markdown content
      import(`/src/data/blog-posts/${foundArticle.contentFile}?raw`)
        .then((module) => {
          setContent(module.default);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading blog post content:', error);
          setLoading(false);
        });
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

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;