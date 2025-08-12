import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, RefreshCw } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [researchData, setResearchData] = useState<AIResearchData | null>(null);
  const [isOpen, setIsOpen] = useState(true);
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

  const formatDigest = (digest: string) => {
    console.log('Raw digest:', digest);
    
    // Split by '- *' to get individual items, but handle the format correctly
    const items = digest.split(/\n- \*/).filter(item => item.trim().length > 0);
    console.log('Split items:', items);
    
    return items.map((item, index) => {
      console.log(`Processing item ${index}:`, item);
      
      // For the first item, it might not have the leading '- *' so handle differently
      let processedItem = item;
      if (index === 0 && !item.startsWith('*')) {
        // Skip if first item doesn't contain a title
        return null;
      }
      
      // Extract the title (text between asterisks)
      const titleMatch = processedItem.match(/^([^*]*)\*/);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract the description (text after asterisk until link indicators)
      const descMatch = processedItem.match(/\* (.+?)(?:\s+(?:Read more|More details|Explore the study|Full article|Discover more|Check it out|Learn more|Details here):|$)/s);
      const description = descMatch ? descMatch[1].trim() : '';
      
      // Extract the link
      const linkMatch = processedItem.match(/https:\/\/[^\s]+/);
      const link = linkMatch ? linkMatch[0] : '';

      console.log(`Extracted - Title: "${title}", Description: "${description}", Link: "${link}"`);

      if (!title || !description) {
        console.log(`Skipping item ${index} - missing title or description`);
        return null;
      }

      return (
        <div key={index} className="border-l-2 border-primary/20 pl-3 mb-2">
          <div className="flex items-start gap-2 text-xs">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white/80 transition-colors group"
            >
              <span className="font-medium text-white cursor-pointer">{title}</span>
              <ExternalLink className="h-3 w-3 text-white/60 group-hover:text-white/80 transition-colors flex-shrink-0" />
            </a>
          </div>
          <p className="text-white/90 text-xs mt-1">{description}</p>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="w-full max-w-5xl md:max-w-6xl mx-auto mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="bg-background/10 backdrop-blur-lg border-primary/20 shadow-lg">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors backdrop-blur-lg py-2 md:py-3 px-3 md:px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm md:text-base lg:text-lg">Latest AI Digest</CardTitle>
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
              <p className="text-xs md:text-sm text-white text-left">
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
                    className="p-2 md:p-3 rounded-lg bg-background/10 backdrop-blur-lg border border-border/20 hover:border-primary/30 hover:bg-background/15 transition-all duration-200"
                  >
                    <a
                      href={headline.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-white/80 transition-colors"
                    >
                      <h4 className="font-medium text-xs md:text-sm text-white mb-1 cursor-pointer">
                        {headline.summary}
                      </h4>
                    </a>
                    <p className="text-xs md:text-sm text-white/90 mb-2">
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
                  className="w-full justify-between p-2 md:p-3 h-auto"
                >
                  <span className="font-medium text-xs md:text-sm text-white">Additional highlight</span>
                  {showDigest ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                
                {showDigest && (
                  <div className="mt-2 p-2 md:p-3 rounded-lg bg-background/5 backdrop-blur-lg border border-border/10">
                    <div className="space-y-1 md:space-y-2 max-h-40 md:max-h-60 overflow-y-auto overflow-x-auto lg:overflow-x-visible">
                      <div className="whitespace-nowrap lg:whitespace-normal">
                        {formatDigest(researchData.digest)}
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