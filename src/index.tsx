import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider.tsx";
import { Toaster } from "sonner";
import "./api/interceptors.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster richColors position="top-right" duration={2500} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
