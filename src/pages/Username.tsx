import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Username = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Check if username already exists
      const { data: existing } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existing) {
        toast({
          title: "Username taken",
          description: "Please choose a different username",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create or update profile with username
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username,
          display_name: user.user_metadata?.full_name || username,
          photo_url: user.user_metadata?.avatar_url,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your username has been set.",
      });

      navigate("/feed");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-4xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold">ROTT</h1>
          <p className="text-muted-foreground">
            Brain rot, but in a good way
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Choose your username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              required
              minLength={3}
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">
              3-20 characters, lowercase letters, numbers and underscores only
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading || username.length < 3}>
            {loading ? "Setting username..." : "Continue"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Username;
