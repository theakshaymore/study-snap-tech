import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Capacitor } from "@capacitor/core";

export const useGoogleAuth = () => {
  const { toast } = useToast();

  const signInWithGoogle = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await GoogleAuth.initialize();
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
      } else {
        // Web: use built-in OAuth flow (no client ID needed here)
        const redirectUrl = `${window.location.origin}/feed`;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: redirectUrl,
            queryParams: { prompt: "select_account" },
          },
        });

        if (error) throw error;

        toast({
          title: "Redirecting...",
          description: "Continue in Google to sign in.",
        });

        // Redirect flow will handle session; nothing to return here
        return null;
      }
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
