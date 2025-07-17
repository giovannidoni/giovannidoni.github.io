import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const DolomitesDataMountainsML = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/#blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card className="p-8">
            {/* Article header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  December 20, 2023
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  5 min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                From the Dolomites to Data: What Mountains Teach Us About ML
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Career", "Philosophy", "Mountains"].map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-xl text-muted-foreground mb-8">
                Drawing parallels between mountain climbing and machine learning - patience, preparation, and the importance of taking one step at a time.
              </p>

              <h2 className="text-2xl font-bold mb-4">The Summit Isn't Everything</h2>
              <p className="mb-6">
                Standing at the base of a towering peak in the Dolomites, I'm often reminded of the journey we take 
                in machine learning projects. The summit - whether it's a successful model deployment or reaching 
                the mountain top - is just one moment in a much longer journey.
              </p>

              <h2 className="text-2xl font-bold mb-4">Preparation and Planning</h2>
              <p className="mb-6">
                Just as you wouldn't attempt a challenging climb without proper gear and route planning, successful 
                ML projects require meticulous preparation:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Understanding the terrain (data landscape)</li>
                <li>Choosing the right tools and techniques</li>
                <li>Planning for different weather conditions (edge cases)</li>
                <li>Having backup plans when things don't go as expected</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">One Step at a Time</h2>
              <p className="mb-6">
                Mountains teach you patience. You can't rush to the summit - you must take it one step at a time, 
                respecting the mountain and your own limitations. Similarly, in machine learning, we must resist 
                the urge to jump to complex solutions without building solid foundations.
              </p>

              <p className="mb-6">
                Each data point is a step, each experiment a section of the climb. Some steps are harder than others, 
                some require backtracking, but each one brings you closer to your goal.
              </p>

              <h2 className="text-2xl font-bold mb-4">The Weather Always Changes</h2>
              <p className="mb-6">
                Mountain weather is notoriously unpredictable, much like the challenges we face in ML projects. 
                Data distributions shift, requirements change, and new obstacles emerge. The key is building 
                systems and processes that are resilient to these changes.
              </p>

              <h2 className="text-2xl font-bold mb-4">Finding Joy in the Journey</h2>
              <p className="mb-6">
                Perhaps most importantly, both mountaineering and machine learning teach us to find joy in the 
                process itself. The satisfaction of solving a difficult problem, the beauty of an elegant solution, 
                the camaraderie of working with a great team - these moments along the way are often more rewarding 
                than reaching the final destination.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DolomitesDataMountainsML;