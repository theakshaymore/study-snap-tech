import { ArrowLeft, Moon, Sun, Monitor, LogOut, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate("/auth");
  };

  const handleFeedback = () => {
    window.location.href = "mailto:feedback@rott.app?subject=ROTT Feedback";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Theme Settings */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Appearance</h2>
            <p className="text-sm text-muted-foreground">
              Choose how ROTT looks to you
            </p>
          </div>

          <RadioGroup value={theme} onValueChange={(value) => setTheme(value as "dark" | "light" | "system")}>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center gap-3 flex-1 cursor-pointer">
                <Sun className="h-5 w-5" />
                <div>
                  <div className="font-medium">Light</div>
                  <div className="text-sm text-muted-foreground">Bright and clear</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center gap-3 flex-1 cursor-pointer">
                <Moon className="h-5 w-5" />
                <div>
                  <div className="font-medium">Dark</div>
                  <div className="text-sm text-muted-foreground">Easy on the eyes</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex items-center gap-3 flex-1 cursor-pointer">
                <Monitor className="h-5 w-5" />
                <div>
                  <div className="font-medium">System</div>
                  <div className="text-sm text-muted-foreground">Matches your device</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* About */}
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">About</h2>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleFeedback}
          >
            <Mail className="h-5 w-5" />
            Send Feedback
          </Button>
        </Card>

        {/* Account */}
        <Card className="p-6">
          <Button
            variant="destructive"
            className="w-full justify-start gap-3"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
