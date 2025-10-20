import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockVideos = [
  {
    id: 1,
    title: "React Hooks in 60 seconds",
    author: "TechGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechGuru",
    likes: 1234,
    comments: 89,
    category: "React",
  },
  {
    id: 2,
    title: "CSS Grid Made Easy",
    author: "CSSMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CSSMaster",
    likes: 892,
    comments: 45,
    category: "CSS",
  },
];

const Feed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = mockVideos[currentVideoIndex];

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Video Area */}
      <div className="relative h-full w-full flex items-center justify-center bg-muted">
        {/* Mock Video Placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎥</div>
            <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
            <p className="text-muted-foreground">Video content would play here</p>
          </div>
        </div>

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
            <span className="text-sm font-medium">{currentVideo.comments}</span>
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
              <AvatarImage src={currentVideo.avatar} />
              <AvatarFallback>{currentVideo.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{currentVideo.author}</p>
              <p className="text-sm text-muted-foreground">{currentVideo.category}</p>
            </div>
          </div>
          <p className="text-sm line-clamp-2">{currentVideo.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
