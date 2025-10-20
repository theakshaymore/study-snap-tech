import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const trendingTopics = [
  { name: "React", count: "1.2K videos" },
  { name: "JavaScript", count: "2.5K videos" },
  { name: "Python", count: "1.8K videos" },
  { name: "CSS", count: "950 videos" },
  { name: "AI/ML", count: "750 videos" },
  { name: "Web3", count: "450 videos" },
];

const Discover = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Discover</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search topics, creators..." 
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Trending Topics</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {trendingTopics.map((topic) => (
            <Card key={topic.name} className="p-4 hover:bg-accent cursor-pointer transition-colors">
              <Badge className="mb-2">{topic.name}</Badge>
              <p className="text-sm text-muted-foreground">{topic.count}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
        <div className="flex flex-wrap gap-2">
          {["Frontend", "Backend", "Mobile", "DevOps", "Data Science", "Security", "Design", "Career"].map((cat) => (
            <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
