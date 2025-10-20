import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Video {
  id: string;
  title: string;
  description: string | null;
  category: string;
  video_url: string;
  likes: number;
  comments_count: number;
  user_id: string;
  created_at: string;
}

const Feed = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setVideos(data);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🎥</div>
          <h2 className="text-2xl font-bold mb-2">No videos yet</h2>
          <p className="text-muted-foreground mb-4">
            Be the first to create a study reel!
          </p>
          <Button onClick={() => navigate("/create")}>Create Video</Button>
        </div>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Video Area */}
      <div className="relative h-full w-full flex items-center justify-center bg-muted">
        {/* Video Player */}
        <video
          key={currentVideo.id}
          className="w-full h-full object-cover"
          src={currentVideo.video_url}
          autoPlay
          loop
          playsInline
          controls={false}
        />

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 bg-background/80 backdrop-blur">
              <Heart className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">{currentVideo.likes}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 bg-background/80 backdrop-blur">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">{currentVideo.comments_count}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 bg-background/80 backdrop-blur">
              <Bookmark className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 bg-background/80 backdrop-blur">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarFallback>
                {currentVideo.user_id.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">User</p>
              <p className="text-sm text-muted-foreground">
                {currentVideo.category}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium mb-1">{currentVideo.title}</p>
          {currentVideo.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {currentVideo.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
