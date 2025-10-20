import { useState } from "react";
import { Video, Image, Type, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleCreate = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please add a title for your video",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Video created!",
      description: "Your study reel has been published",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create</h1>
          <Button onClick={handleCreate}>Publish</Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Video Upload */}
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg border-border hover:border-primary transition-colors cursor-pointer">
            <Video className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">Upload your video</p>
            <p className="text-xs text-muted-foreground">Max 60 seconds, MP4 or MOV</p>
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
                  <Button key={cat} variant="outline" size="sm">
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
