import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import TeamSelection from "./pages/TeamSelection";
import TeamRoster from "./pages/TeamRoster";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import ScratchCardPage from "./pages/ScratchCardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Reverted to Index as the root component */}
            <Route path="/" element={<Index />} />
            <Route path="/team-selection" element={<TeamSelection />} />
            <Route path="/team-roster" element={<TeamRoster />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dice-roll" element={<ScratchCardPage />} />
            <Route path="/scratch-card" element={<ScratchCardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
