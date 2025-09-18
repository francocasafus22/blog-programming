import { createRoot } from "react-dom/client";
import "./index.css";

import Router from "./router";
import { ThemeProvider } from "./hooks/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router />
  </ThemeProvider>
);
