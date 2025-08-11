import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Rss, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  excerpt?: string;
}

const NewContentBanner = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      title: "The Engineering Leadership Paradox: Why Senior Engineers Struggle with Management",
      link: "https://newsletter.pragmaticengineer.com/p/engineering-leadership-paradox",
      pubDate: new Date().toISOString(),
      source: "Pragmatic Engineer"
    },
    {
      title: "Building High-Performance Engineering Teams",
      link: "https://leaddev.com/team/building-high-performance-engineering-teams",
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      source: "LeadDev"
    },
    {
      title: "Ask HN: What's the most valuable skill you've learned as a programmer?",
      link: "https://news.ycombinator.com/item?id=12345678",
      pubDate: new Date(Date.now() - 3600000).toISOString(),
      source: "Hacker News"
    }
  ]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mobileApi, setMobileApi] = useState<CarouselApi>();
  const [desktopApi, setDesktopApi] = useState<CarouselApi>();

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        // Try to fetch real RSS feeds
        const feeds = [
          {
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://newsletter.pragmaticengineer.com/feed'),
            source: 'Pragmatic Engineer'
          },
          {
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://leaddev.com/rss.xml'),
            source: 'LeadDev'
          },
          {
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://hnrss.org/frontpage'),
            source: 'Hacker News'
          }
        ];

        const allItems: FeedItem[] = [];

        for (const feed of feeds) {
          try {
            const response = await fetch(feed.url);
            const data = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            
            const items = xmlDoc.querySelectorAll('item');
            
            for (let i = 0; i < Math.min(items.length, 3); i++) {
              const item = items[i];
              const title = item.querySelector('title')?.textContent || '';
              const link = item.querySelector('link')?.textContent || '';
              const pubDate = item.querySelector('pubDate')?.textContent || '';
              const description = item.querySelector('description')?.textContent || '';
              
              if (title && link) {
                allItems.push({
                  title: title.trim(),
                  link: link.trim(),
                  pubDate,
                  source: feed.source,
                  excerpt: description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
                });
              }
            }
          } catch (error) {
            console.error(`Error fetching ${feed.source}:`, error);
          }
        }

        // If we got real data, use it; otherwise keep the sample data
        if (allItems.length > 0) {
          allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
          setFeedItems(allItems.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching feeds:', error);
      } finally {
        setLoading(false);
      }
    };

    // Delay the fetch to show the banner immediately with sample data
    setTimeout(fetchFeeds, 1000);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!mobileApi || !desktopApi) return;

    const scrollInterval = setInterval(() => {
      if (mobileApi) {
        mobileApi.scrollNext();
      }
      if (desktopApi) {
        desktopApi.scrollNext();
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(scrollInterval);
  }, [mobileApi, desktopApi]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (!isVisible || feedItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-accent/10 border-b border-border/40 sticky top-16 z-40 backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Mobile Layout */}
        <div className="flex sm:hidden items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                <Rss className="h-2.5 w-2.5 mr-1" />
                Fresh Reads
              </Badge>
            </div>
            <Carousel className="w-full" setApi={setMobileApi}>
              <CarouselContent>
                {feedItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="pr-4">
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group block hover:text-accent transition-colors"
                      >
                        <div className="text-sm font-medium leading-tight line-clamp-2 mb-1">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="truncate">{item.source}</span>
                          <span>•</span>
                          <span className="whitespace-nowrap">{formatDate(item.pubDate)}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 ml-1 flex-shrink-0" />
                        </div>
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-7 w-7 p-0 hover:bg-background/80 flex-shrink-0 mt-0.5"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              <Rss className="h-3 w-3 mr-1" />
              Fresh Reads
            </Badge>
            <div className="hidden lg:block text-sm text-muted-foreground">
              Latest from engineering leadership
            </div>
          </div>
          
          <div className="flex-1 mx-4 max-w-2xl">
            <Carousel className="w-full" setApi={setDesktopApi}>
              <CarouselContent>
                {feedItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 hover:text-accent transition-colors"
                        >
                          <span className="text-sm font-medium truncate">
                            {item.title}
                          </span>
                          <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 flex-shrink-0" />
                        </a>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{item.source}</span>
                          <span>•</span>
                          <span>{formatDate(item.pubDate)}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="h-6 w-6" />
              <CarouselNext className="h-6 w-6" />
            </Carousel>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0 hover:bg-background/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewContentBanner;