import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import deluxeRoom from "@/assets/room-deluxe.jpg";
import beachHotel from "@/assets/hotel-beach.jpg";

const mockBookings = [
  {
    id: 1,
    bookingReference: "BK001",
    hotelName: "Grand Taj Palace",
    city: "Mumbai, India",
    roomType: "Deluxe Room",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    totalAmount: 10500,
    status: "CONFIRMED",
    paymentStatus: "COMPLETED",
    image: deluxeRoom,
  },
  {
    id: 2,
    bookingReference: "BK002",
    hotelName: "Goa Beach Resort",
    city: "Goa, India",
    roomType: "Sea View Room",
    checkIn: "2024-03-01",
    checkOut: "2024-03-05",
    guests: 2,
    totalAmount: 18000,
    status: "PENDING",
    paymentStatus: "PENDING",
    image: beachHotel,
  },
];

const statusConfig = {
  CONFIRMED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  PENDING: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  CANCELLED: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
};

export default function Bookings() {
  const activeBookings = mockBookings.filter((b) => b.status !== "CANCELLED");
  const pastBookings = mockBookings.filter((b) => b.status === "CHECKED_OUT");

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const StatusIcon = statusConfig[booking.status as keyof typeof statusConfig]?.icon || Clock;
    const statusColor = statusConfig[booking.status as keyof typeof statusConfig]?.color;
    const statusBg = statusConfig[booking.status as keyof typeof statusConfig]?.bg;

    return (
      <Card className="overflow-hidden border-border bg-gradient-card hover:shadow-medium transition-all">
        <div className="md:flex">
          <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
            <img
              src={booking.image}
              alt={booking.hotelName}
              className="w-full h-full object-cover"
            />
          </div>

          <CardContent className="md:w-2/3 p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {booking.hotelName}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.city}
                  </div>
                </div>
                <Badge className={`${statusBg} ${statusColor} border-0`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {booking.status}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 py-3 border-y border-border">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="ml-2 font-medium text-foreground">{booking.checkIn}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="ml-2 font-medium text-foreground">{booking.checkOut}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">Guests:</span>
                    <span className="ml-2 font-medium text-foreground">{booking.guests}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Room:</span>
                    <span className="ml-2 font-medium text-foreground">{booking.roomType}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
                  <p className="font-mono text-sm font-medium text-foreground">
                    {booking.bookingReference}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                    ₹{booking.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 border-border">
                  View Details
                </Button>
                {booking.status === "PENDING" && (
                  <Button className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Complete Payment
                  </Button>
                )}
                {booking.status === "CONFIRMED" && (
                  <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your hotel reservations</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-8 bg-muted">
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Active Bookings ({activeBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Past Bookings ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeBookings.length > 0 ? (
              activeBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Active Bookings
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start planning your next trip!
                  </p>
                  <Button className="bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                    Browse Hotels
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Past Bookings
                  </h3>
                  <p className="text-muted-foreground">
                    Your booking history will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
