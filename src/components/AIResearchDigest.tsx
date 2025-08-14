import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, RefreshCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIResearchData {
  picked_headlines: Array<{
    item_number: number;
    summary: string;
    link: string;
    reason_for_choice: string;
  }>;
  digest: string;
}

const AIResearchDigest = () => {
  const isMobile = useIsMobile();
  const [researchData, setResearchData] = useState<AIResearchData | null>(null);
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [showDigest, setShowDigest] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadResearchData = async () => {
    try {
      setIsRefreshing(true);
      console.log('Attempting to fetch AI research data...');
      // Add cache busting timestamp and headers to ensure fresh data
      const response = await fetch(`/summarised_results.json?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully loaded research data:', data);
      setResearchData(data);
    } catch (error) {
      console.error('Error loading research data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadResearchData();
    
    // Set up periodic refresh every 10 minutes
    const interval = setInterval(loadResearchData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!researchData) return null;

  return (
    <div className="w-full max-w-5xl md:max-w-6xl mx-auto mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="bg-card/90 backdrop-blur-lg border-border shadow-lg">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors backdrop-blur-lg py-2 md:py-3 px-3 md:px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm md:text-base lg:text-lg text-foreground">Labnotes - Latest AI Digest</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      loadResearchData();
                    }}
                    disabled={isRefreshing}
                    className="h-6 w-6 p-0 ml-2"
                  >
                    <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground text-left">
                Curated highlights from the latest AI/ML news
              </p>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 px-3 md:px-4 pb-2 md:pb-3">
              {/* Featured Headlines */}
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                {researchData.picked_headlines.map((headline, index) => (
                  <div
                    key={index}
                    className="p-2 md:p-3 rounded-lg bg-card backdrop-blur-lg border border-border hover:border-primary/50 hover:bg-accent/30 transition-all duration-200"
                  >
                    <a
                      href={headline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-primary transition-colors"
                    >
                      <h4 className="font-medium text-xs md:text-sm text-foreground mb-1 cursor-pointer">
                        {headline.summary}
                      </h4>
                    </a>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">
                      {headline.reason_for_choice}
                    </p>
                  </div>
                ))}
              </div>

              {/* Research Digest Toggle */}
              <div className="border-t border-border/30 pt-2 md:pt-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowDigest(!showDigest)}
                  className="w-full justify-between p-2 md:p-3 h-auto bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/30 rounded-lg"
                >
                  <span className="font-medium text-xs md:text-sm text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    Additional highlight
                  </span>
                  {showDigest ? (
                    <ChevronUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-green-600" />
                  )}
                </Button>
                
                {showDigest && (
                  <div className="mt-2 p-2 md:p-3 rounded-lg bg-gradient-to-br from-card/80 to-green-500/5 backdrop-blur-lg shadow-lg shadow-green-500/10">
                    <div className="space-y-1 md:space-y-2 max-h-40 md:max-h-60 overflow-y-auto overflow-x-auto lg:overflow-x-visible">
                      <div className="whitespace-nowrap lg:whitespace-normal text-left space-y-2">
                        {researchData.digest.replace(/\*/g, '').split('\n').filter(line => line.trim()).map((line, index) => {
                          // Extract URL from the line using regex
                          const urlMatch = line.match(/(https?:\/\/[^\s\)]+)/);
                          const url = urlMatch ? urlMatch[1] : null;
                          
                          return (
                            <div key={index} className="flex items-start gap-2 text-xs text-foreground">
                              <span className="flex-1 whitespace-pre-wrap font-sans">
                                {line}
                              </span>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 p-1 hover:bg-accent rounded transition-colors"
                                  title="Read more"
                                >
                                  <ExternalLink className="h-3 w-3 text-primary" />
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default AIResearchDigest;