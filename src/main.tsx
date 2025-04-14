import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DropdownProvider } from "./Context/Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <DropdownProvider>
          <App />
      </DropdownProvider>
    </QueryClientProvider>
  </StrictMode>
);
