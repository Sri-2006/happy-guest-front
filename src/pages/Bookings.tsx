import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const statusConfig = {
  CONFIRMED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  PENDING: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  CANCELLED: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  CHECKED_OUT: { icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
};

export default function Bookings() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your bookings");
      navigate("/auth");
    }
  }, [user, navigate]);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          hotels (hotel_name, cities (city_name)),
          rooms (room_type, price_per_night)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const activeBookings = bookings.filter((b) => 
    ["CONFIRMED", "PENDING"].includes(b.booking_status)
  );
  const pastBookings = bookings.filter((b) => 
    ["CHECKED_OUT", "CANCELLED"].includes(b.booking_status)
  );

  if (!user) return null;

  const BookingCard = ({ booking }: { booking: any }) => {
    const StatusIcon = statusConfig[booking.booking_status as keyof typeof statusConfig]?.icon || Clock;
    const statusColor = statusConfig[booking.booking_status as keyof typeof statusConfig]?.color;
    const statusBg = statusConfig[booking.booking_status as keyof typeof statusConfig]?.bg;

    return (
      <Card className="overflow-hidden border-border bg-gradient-card hover:shadow-medium transition-all">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {booking.hotels?.hotel_name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.hotels?.cities?.city_name}
                </div>
              </div>
              <Badge className={`${statusBg} ${statusColor} border-0`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {booking.booking_status}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 py-3 border-y border-border">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="ml-2 font-medium text-foreground">
                    {new Date(booking.check_in_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="ml-2 font-medium text-foreground">
                    {new Date(booking.check_out_date).toLocaleDateString()}
                  </span>
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
                  <span className="ml-2 font-medium text-foreground">
                    {booking.rooms?.room_type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
                <p className="font-mono text-sm font-medium text-foreground">
                  {booking.booking_reference}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                  ₹{Number(booking.total_amount).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 border-border">
                View Details
              </Button>
              {booking.booking_status === "PENDING" && (
                <Button 
                  className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground"
                  onClick={() => toast.info("Payment integration coming soon")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Payment
                </Button>
              )}
            </div>
          </div>
        </CardContent>
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
            {isLoading ? (
              <Card className="border-border bg-card">
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading bookings...</p>
                </CardContent>
              </Card>
            ) : activeBookings.length > 0 ? (
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
                  <Button 
                    className="bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                    onClick={() => navigate("/hotels")}
                  >
                    Browse Hotels
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {isLoading ? (
              <Card className="border-border bg-card">
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Loading bookings...</p>
                </CardContent>
              </Card>
            ) : pastBookings.length > 0 ? (
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
