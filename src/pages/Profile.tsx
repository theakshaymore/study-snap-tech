import { Settings, Grid3x3, Bookmark, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">@username</h2>
          <p className="text-sm text-muted-foreground mb-4">Learning and sharing tech daily 🚀</p>
          
          <div className="flex gap-6 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">42</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1.2K</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">340</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Button className="w-full max-w-xs">Edit Profile</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-primary" />
              <p className="font-semibold">Level 5</p>
            </div>
            <p className="text-xs text-muted-foreground">Creator Badge</p>
          </Card>
          <Card className="p-4">
            <p className="font-semibold mb-1">15.2K</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos">
              <Grid3x3 className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[9/16] bg-muted rounded flex items-center justify-center">
                  <span className="text-4xl">🎥</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[9/16] bg-muted rounded flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
