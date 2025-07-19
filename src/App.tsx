import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/CookieBanner";
import ScalingLLMsProduction from "./pages/blog/ScalingLLMsProduction";
import DolomitesDataMountainsML from "./pages/blog/DolomitesDataMountainsML";
import RobustMLPipelines from "./pages/blog/RobustMLPipelines";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog/scaling-llms-production-deliveroo" element={<ScalingLLMsProduction />} />
          <Route path="/blog/dolomites-data-mountains-ml" element={<DolomitesDataMountainsML />} />
          <Route path="/blog/robust-ml-pipelines-kubernetes-argo" element={<RobustMLPipelines />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
