import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routs/Routs.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
