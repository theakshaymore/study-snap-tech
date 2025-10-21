import { createRoot } from "react-dom/client";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import App from "./App.tsx";
import "./index.css";

// Initialize Google Auth for web
GoogleAuth.initialize();

createRoot(document.getElementById("root")!).render(<App />);
