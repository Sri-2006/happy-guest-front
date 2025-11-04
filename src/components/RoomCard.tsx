import { Users, Maximize, Bed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    description: string;
    price: number;
    maxOccupancy: number;
    bedType: string;
    size: number;
    image: string;
    amenities: string[];
  };
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 border-border bg-gradient-card">
      <div className="md:flex">
        <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <CardContent className="md:w-3/5 p-6">
          <div className="space-y-4 h-full flex flex-col">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {room.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {room.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="h-3 w-3 mr-1" />
                {room.maxOccupancy} Guests
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Bed className="h-3 w-3 mr-1" />
                {room.bedType}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Maximize className="h-3 w-3 mr-1" />
                {room.size} sq ft
              </Badge>
            </div>

            <div className="flex-1" />

            <div className="flex items-end justify-between pt-4 border-t border-border">
              <div>
                <p className="text-3xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                  ₹{room.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">per night</p>
              </div>
              <Button className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-medium px-8">
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
