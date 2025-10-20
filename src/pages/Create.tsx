import { useState, useEffect, useRef } from "react";
import { Video, Image, Type, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a video under 100MB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleCreate = async () => {
    if (!title || !videoFile || !category || !user) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("videos").insert({
        user_id: user.id,
        title,
        description,
        category,
        video_url: publicUrl,
      });

      if (dbError) throw dbError;

      toast({
        title: "Video created!",
        description: "Your study reel has been published",
      });

      navigate("/feed");
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create</h1>
          <Button onClick={handleCreate} disabled={uploading}>
            {uploading ? "Uploading..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Video Upload */}
        <Card className="p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg border-border hover:border-primary transition-colors cursor-pointer"
          >
            <Video className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">
              {videoFile ? videoFile.name : "Upload your video"}
            </p>
            <p className="text-xs text-muted-foreground">
              Max 100MB, MP4, MOV, or WEBM
            </p>
          </div>
        </Card>

        {/* Video Details */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                placeholder="Give your video a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="What will viewers learn from this?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["React", "JavaScript", "Python", "CSS", "AI/ML", "Web3"].map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Editing Tools */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Editing Tools</h3>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex-col h-auto py-4">
              <Type className="h-6 w-6 mb-2" />
              <span className="text-xs">Text</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4">
              <Image className="h-6 w-6 mb-2" />
              <span className="text-xs">Overlay</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4">
              <Sparkles className="h-6 w-6 mb-2" />
              <span className="text-xs">Effects</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Create;
