import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HotelCard } from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import deluxeRoom from "@/assets/room-deluxe.jpg";
import beachHotel from "@/assets/hotel-beach.jpg";
import businessRoom from "@/assets/room-business.jpg";

const allHotels = [
  {
    id: 1,
    name: "Grand Taj Palace",
    city: "Mumbai, India",
    rating: 5.0,
    price: 3500,
    image: deluxeRoom,
    amenities: ["wifi", "parking", "gym", "restaurant"],
  },
  {
    id: 2,
    name: "Delhi Crown Plaza",
    city: "Delhi, India",
    rating: 4.0,
    price: 3000,
    image: businessRoom,
    amenities: ["wifi", "parking", "restaurant"],
  },
  {
    id: 3,
    name: "Bangalore Tech Hotel",
    city: "Bangalore, India",
    rating: 3.5,
    price: 2500,
    image: businessRoom,
    amenities: ["wifi", "parking"],
  },
  {
    id: 4,
    name: "Goa Beach Resort",
    city: "Goa, India",
    rating: 4.5,
    price: 4500,
    image: beachHotel,
    amenities: ["wifi", "parking", "gym", "restaurant"],
  },
  {
    id: 5,
    name: "Royal Jaipur Hotel",
    city: "Jaipur, India",
    rating: 4.0,
    price: 3800,
    image: deluxeRoom,
    amenities: ["wifi", "parking", "restaurant"],
  },
];

const cities = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur"];
const amenitiesList = ["wifi", "parking", "gym", "restaurant"];

export default function Hotels() {
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  const filteredHotels = allHotels
    .filter((hotel) => {
      const cityMatch = selectedCity === "All Cities" || hotel.city.includes(selectedCity);
      const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const amenitiesMatch =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity));
      return cityMatch && priceMatch && amenitiesMatch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Explore Hotels</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <h2 className="text-xl font-bold text-foreground mb-6">Filters</h2>

              {/* City Filter */}
              <div className="space-y-3 mb-6">
                <Label className="text-sm font-medium">City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3 mb-6">
                <Label className="text-sm font-medium">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={15000}
                  step={500}
                  className="py-4"
                />
              </div>

              {/* Amenities */}
              <div className="space-y-3 mb-6">
                <Label className="text-sm font-medium">Amenities</Label>
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={amenity}
                      className="text-sm capitalize cursor-pointer text-foreground"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-border"
                onClick={() => {
                  setSelectedCity("All Cities");
                  setPriceRange([0, 15000]);
                  setSelectedAmenities([]);
                  setSortBy("rating");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No hotels found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
