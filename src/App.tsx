import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceApplication from "./pages/ServiceApplication";
import QuickLinks from "./pages/QuickLinks";
import Requests from "./pages/Requests";
import Reminder from "./pages/Reminder";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Index />} /> 

          <Route path="/services" element={<Services />} />

          <Route path="/service/application/:serviceId" element={<ServiceApplication/>} />

          <Route path="/quick-links" element={<QuickLinks/>} />

          <Route path="/my-requests" element={<Requests/>} />

          <Route path="/reminder" element={<Reminder/>} />






          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}



          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>


      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
