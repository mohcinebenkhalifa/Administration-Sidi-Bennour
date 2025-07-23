
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ActualitesPage from "./pages/ActualitesPage";
import ActualiteDetailPage from "./pages/ActualiteDetailPage";
import EvenementsPage from "./pages/EvenementsPage";
import EvenementDetailPage from "./pages/EvenementDetailPage";
import ParticipationPage from "./pages/ParticipationPage";
import TransparencePage from "./pages/TransparencePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/actualites/:id" element={<ActualiteDetailPage />} />
              <Route path="/evenements" element={<EvenementsPage />} />
              <Route path="/evenements/:id" element={<EvenementDetailPage />} />
              <Route path="/participation" element={<ParticipationPage />} />
              <Route path="/transparence" element={<TransparencePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
