import { Hotel, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/hotels", label: "Hotels" },
    { path: "/bookings", label: "My Bookings" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-lg bg-gradient-luxury flex items-center justify-center shadow-medium">
              <Hotel className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
              LuxeStay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex border-border">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex border-border"
                  onClick={() => navigate("/auth")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="hidden md:flex bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                  onClick={() => navigate("/auth")}
                >
                  Register
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-border">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-border">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(link.path) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    {user ? (
                      <Button 
                        variant="outline" 
                        className="w-full border-border"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full border-border"
                          onClick={() => navigate("/auth")}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                        <Button 
                          className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground"
                          onClick={() => navigate("/auth")}
                        >
                          Register
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
