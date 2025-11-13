import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Capacitor } from "@capacitor/core";

export const useGoogleAuth = () => {
  const { toast } = useToast();

  const signInWithGoogle = async () => {
    try {
      // Initialize GoogleAuth per platform
      if (Capacitor.isNativePlatform()) {
        await GoogleAuth.initialize();
      } else {
        // Ensure web client ID is set for web initialization
        const webClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
        if (!webClientId) {
          throw new Error("Missing Google OAuth client ID. Please set VITE_GOOGLE_CLIENT_ID.");
        }
        await GoogleAuth.initialize({
          clientId: webClientId,
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        });
      }

      const result = await GoogleAuth.signIn();
      
      if (!result || !result.authentication?.idToken) {
        throw new Error("No ID token received from Google");
      }

      // Sign in to Supabase with Google ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: result.authentication.idToken,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Signed in with Google successfully.",
      });

      return data;
    } catch (error: any) {
      // Handle user cancellation gracefully
      if (error.message?.includes("popup_closed_by_user") || 
          error.message?.includes("User cancelled")) {
        return null;
      }

      toast({
        title: "Error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await GoogleAuth.signOut();
      }
      await supabase.auth.signOut();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return { signInWithGoogle, signOut };
};
