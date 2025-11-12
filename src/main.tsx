import { createRoot } from "react-dom/client";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Capacitor } from "@capacitor/core";
import App from "./App.tsx";
import "./index.css";

// Initialize Google Auth for web with proper configuration
if (!Capacitor.isNativePlatform()) {
  GoogleAuth.initialize({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
}

createRoot(document.getElementById("root")!).render(<App />);
