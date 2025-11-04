import { useState } from "react";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [city, setCity] = useState("");

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-2xl shadow-luxury p-6 md:p-8 border border-border">
      <div className="grid gap-6 md:grid-cols-4">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            City
          </Label>
          <Input
            id="city"
            placeholder="Where are you going?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-12 bg-background border-input"
          />
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal bg-background",
                  !checkIn && "text-muted-foreground"
                )}
              >
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal bg-background",
                  !checkOut && "text-muted-foreground"
                )}
              >
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label htmlFor="guests" className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Guests
          </Label>
          <div className="flex items-center gap-2 h-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="h-12 w-12 bg-background"
            >
              -
            </Button>
            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
              className="h-12 text-center bg-background"
              min="1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(guests + 1)}
              className="h-12 w-12 bg-background"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Button 
        className="w-full mt-6 h-14 text-lg font-semibold bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-luxury transition-all hover:scale-[1.02]"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Hotels
      </Button>
    </div>
  );
}
