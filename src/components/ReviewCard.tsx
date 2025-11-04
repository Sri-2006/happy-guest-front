import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReviewCardProps {
  review: {
    id: number;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    cleanliness: number;
    service: number;
    date: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-border bg-card hover:shadow-soft transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">{review.userName}</h4>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-secondary text-secondary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-foreground">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-1">{review.title}</h5>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {review.comment}
              </p>
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Cleanliness: {review.cleanliness}/5</span>
              <span>Service: {review.service}/5</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
