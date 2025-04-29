
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import AIAdvisor from "./pages/AIAdvisor";
import JobTrends from "./pages/JobTrends";
import Integrations from "./pages/Integrations";
import Profile from "./pages/Profile"; // Add Profile import
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/job-trends" element={<JobTrends />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
