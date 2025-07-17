import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const RobustMLPipelines = () => {
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
                  November 28, 2023
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  12 min read
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-6">
                Building Robust ML Pipelines with Kubernetes and Argo
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Kubernetes", "MLOps", "Infrastructure"].map((tag, index) => (
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
                A practical guide to orchestrating machine learning workflows using modern container orchestration tools.
              </p>

              <h2 className="text-2xl font-bold mb-4">The Need for Orchestration</h2>
              <p className="mb-6">
                As machine learning workflows become more complex, the need for robust orchestration becomes critical. 
                Traditional batch processing and manual deployment processes simply don't scale when you're dealing 
                with multiple models, frequent retraining cycles, and complex data dependencies.
              </p>

              <h2 className="text-2xl font-bold mb-4">Why Kubernetes + Argo?</h2>
              <p className="mb-6">
                Kubernetes provides the foundational infrastructure for containerized workloads, while Argo Workflows 
                offers a powerful workflow orchestration engine built specifically for Kubernetes. Together, they 
                create a robust platform for ML operations:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Declarative workflow definitions</li>
                <li>Built-in retry and error handling mechanisms</li>
                <li>Resource management and auto-scaling</li>
                <li>Complex dependency management</li>
                <li>Artifact management and lineage tracking</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
              <p className="mb-6">
                Our ML pipeline architecture consists of several key components:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Data Ingestion Layer:</strong> Automated data collection and validation</li>
                <li><strong>Feature Engineering:</strong> Scalable feature computation and storage</li>
                <li><strong>Model Training:</strong> Distributed training with hyperparameter optimization</li>
                <li><strong>Model Evaluation:</strong> Automated testing and validation</li>
                <li><strong>Deployment Pipeline:</strong> Safe model rollouts with monitoring</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Implementation Details</h2>
              <p className="mb-6">
                Each component is implemented as a containerized service that can be independently scaled and 
                managed. Argo Workflows orchestrates the entire pipeline, handling dependencies, failures, 
                and resource allocation automatically.
              </p>

              <p className="mb-6">
                One of the key advantages of this approach is the ability to handle complex workflows with 
                conditional logic, parallel execution, and dynamic resource allocation based on workload 
                requirements.
              </p>

              <h2 className="text-2xl font-bold mb-4">Monitoring and Observability</h2>
              <p className="mb-6">
                Building robust pipelines isn't just about the happy path - you need comprehensive monitoring 
                and observability to detect and respond to issues quickly. We integrate with Prometheus for 
                metrics collection and Grafana for visualization, providing real-time insights into pipeline 
                performance and health.
              </p>

              <h2 className="text-2xl font-bold mb-4">Lessons and Best Practices</h2>
              <p className="mb-6">
                After running this infrastructure in production for over a year, we've learned several important 
                lessons about building and maintaining ML pipelines at scale. The key is finding the right 
                balance between flexibility and reliability.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RobustMLPipelines;