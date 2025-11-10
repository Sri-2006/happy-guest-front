import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HotelCard } from "@/components/HotelCard";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const amenitiesList = ["wifi", "parking", "gym", "restaurant", "pool", "spa"];

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All Cities");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");

  // Fetch cities from database
  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("city_name")
        .order("city_name");
      if (error) throw error;
      return ["All Cities", ...data.map(c => c.city_name)];
    },
  });

  // Fetch hotels with related data
  const { data: hotels = [], isLoading } = useQuery({
    queryKey: ["hotels", selectedCity, priceRange, selectedAmenities, sortBy],
    queryFn: async () => {
      let query = supabase
        .from("hotels")
        .select(`
          id,
          hotel_name,
          star_rating,
          image_url,
          cities!inner (
            city_name,
            state,
            country
          ),
          rooms!inner (
            price_per_night
          ),
          hotel_amenities (
            amenities (
              amenity_name
            )
          )
        `);

      // Filter by city
      if (selectedCity !== "All Cities") {
        query = query.eq("cities.city_name", selectedCity);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Transform data to match component expectations
      const transformedHotels = data.map((hotel: any) => {
        const minPrice = Math.min(...hotel.rooms.map((r: any) => r.price_per_night));
        const amenitiesSet = new Set<string>();
        if (hotel.hotel_amenities) {
          hotel.hotel_amenities.forEach((ha: any) => {
            if (ha.amenities?.amenity_name) {
              amenitiesSet.add(ha.amenities.amenity_name);
            }
          });
        }
        const amenities = Array.from(amenitiesSet);
        
        return {
          id: hotel.id,
          name: hotel.hotel_name,
          city: `${hotel.cities.city_name}, ${hotel.cities.state}`,
          rating: hotel.star_rating || 5,
          price: minPrice,
          image: hotel.image_url,
          amenities,
        };
      });

      // Filter by price and amenities
      let filtered = transformedHotels.filter((hotel: any) => {
        const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
        const amenitiesMatch = selectedAmenities.length === 0 || 
          selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
        return priceMatch && amenitiesMatch;
      });

      // Sort
      filtered.sort((a: any, b: any) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });

      return filtered;
    },
  });

  // Update city from URL params
  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam && cityParam !== selectedCity) {
      setSelectedCity(cityParam);
    }
  }, [searchParams]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCity("All Cities");
    setSelectedAmenities([]);
    setSortBy("rating");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Explore Hotels</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-card rounded-xl p-6 border border-border shadow-soft">
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
                  max={10000}
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
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </Card>
          </aside>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              {isLoading ? (
                <p className="text-muted-foreground">Loading hotels...</p>
              ) : (
                <p className="text-muted-foreground">
                  {hotels.length} hotel{hotels.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
                {hotels.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">
                    No hotels found matching your criteria.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
