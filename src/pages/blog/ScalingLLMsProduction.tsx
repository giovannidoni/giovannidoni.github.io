import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const ScalingLLMsProduction = () => {
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
                  January 15, 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  8 min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                Scaling LLMs in Production: Lessons from Deliveroo
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {["LLMs", "Production", "MLOps"].map((tag, index) => (
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
                A deep dive into the challenges and solutions for deploying large language models at scale in production environments.
              </p>

              <h2 className="text-2xl font-bold mb-4">The Challenge of Scale</h2>
              <p className="mb-6">
                When we first started integrating LLMs into Deliveroo's production systems, we quickly realized that 
                what works in a research environment doesn't always translate to production. The challenges we faced 
                were multifaceted: latency requirements, cost optimization, model serving infrastructure, and ensuring 
                consistent performance under varying loads.
              </p>

              <h2 className="text-2xl font-bold mb-4">Infrastructure Considerations</h2>
              <p className="mb-6">
                Building a robust infrastructure for LLM serving required careful consideration of several factors:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Model quantization and optimization techniques</li>
                <li>Dynamic batching for improved throughput</li>
                <li>Kubernetes-based auto-scaling solutions</li>
                <li>GPU resource management and allocation</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Lessons Learned</h2>
              <p className="mb-6">
                Through months of iteration and optimization, we've learned valuable lessons about deploying LLMs 
                at scale. The key is finding the right balance between model performance, infrastructure costs, 
                and operational complexity.
              </p>

              <p className="mb-6">
                One of the most important insights was the need for comprehensive monitoring and observability. 
                LLMs can behave unpredictably, and having the right metrics in place is crucial for maintaining 
                system reliability.
              </p>

              <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
              <p className="mb-6">
                As the field continues to evolve rapidly, we're constantly adapting our approaches. The future 
                of production LLM deployments will likely involve even more sophisticated optimization techniques 
                and specialized hardware solutions.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScalingLLMsProduction;