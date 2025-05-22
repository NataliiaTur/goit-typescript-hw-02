import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.module.css";
import App from "././components/App/App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
