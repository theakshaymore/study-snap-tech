import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.deabd80c5f17476f9b9ffbfd64598b4d',
  appName: 'ROTT',
  webDir: 'dist',
  server: {
    url: 'https://deabd80c-5f17-476f-9b9f-fbfd64598b4d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
