
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FamilyProvider } from "./contexts/FamilyContext";
import AppLayout from "./components/layout/AppLayout";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import MealPlan from "./pages/MealPlan";
import Family from "./pages/Family";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FamilyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/meal-plan" element={<MealPlan />} />
              <Route path="/family" element={<Family />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </FamilyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
