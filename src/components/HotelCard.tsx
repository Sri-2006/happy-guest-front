import { Star, MapPin, Wifi, Car, Dumbbell, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HotelCardProps {
  hotel: {
    id: number;
    name: string;
    city: string;
    rating: number;
    price: number;
    image: string;
    amenities: string[];
  };
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  gym: Dumbbell,
  restaurant: Utensils,
};

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-luxury transition-all duration-300 hover:scale-[1.02] border-border bg-gradient-card">
      <div className="relative h-56 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-secondary text-secondary-foreground px-3 py-1.5 shadow-luxury">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {hotel.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
              {hotel.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {hotel.city}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {hotel.amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;
              return (
                <div
                  key={amenity}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs"
                >
                  <Icon className="h-3 w-3" />
                  <span className="capitalize">{amenity}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                ₹{hotel.price.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
