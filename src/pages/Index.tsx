import { SearchBar } from "@/components/SearchBar";
import { HotelCard } from "@/components/HotelCard";
import { Navbar } from "@/components/Navbar";
import heroImage from "@/assets/hero-hotel.jpg";
import beachHotel from "@/assets/hotel-beach.jpg";
import deluxeRoom from "@/assets/room-deluxe.jpg";
import businessRoom from "@/assets/room-business.jpg";
import { Star, Award, Shield, Headphones } from "lucide-react";

const featuredHotels = [
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
    name: "Goa Beach Resort",
    city: "Goa, India",
    rating: 4.5,
    price: 4500,
    image: beachHotel,
    amenities: ["wifi", "parking", "restaurant"],
  },
  {
    id: 3,
    name: "Delhi Crown Plaza",
    city: "Delhi, India",
    rating: 4.0,
    price: 3000,
    image: businessRoom,
    amenities: ["wifi", "parking", "gym", "restaurant"],
  },
];

const features = [
  {
    icon: Star,
    title: "Best Price Guarantee",
    description: "Find the lowest prices on your favorite hotels",
  },
  {
    icon: Award,
    title: "Verified Reviews",
    description: "Real reviews from real travelers",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payment information is safe with us",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help, anytime you need us",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury hotel lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-12 drop-shadow-md max-w-2xl mx-auto">
            Book luxury hotels worldwide with the best prices and exclusive deals
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Hotels
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked luxury accommodations for an unforgettable experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose LuxeStay?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-medium transition-all"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-luxury flex items-center justify-center shadow-luxury">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-lg mb-4">About LuxeStay</h3>
              <p className="text-primary-foreground/80 text-sm">
                Your trusted partner for luxury hotel bookings worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Cancellation</li>
                <li>Terms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>support@luxestay.com</li>
                <li>+91 1800-LUXE-STAY</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            © 2024 LuxeStay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
