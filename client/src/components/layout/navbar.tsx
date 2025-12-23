import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, User, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Therapies", href: "/therapies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location?.startsWith(href)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Contact Info Bar */}
      <div className="bg-medical-blue text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div className="flex items-center mb-1 sm:mb-0">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+91-7015017485</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>736, opposite ekta park, near lucky bakery, Model Town, Panipat, Haryana 132103</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Heart className="text-medical-blue text-2xl mr-2" />
            <Link href="/">
              <span className="text-xl font-bold text-gray-900 cursor-pointer">
                Dukhniwaran Physiotherapy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                      isActive(item.href)
                        ? "text-medical-blue border-b-2 border-medical-blue"
                        : "text-gray-700 hover:text-medical-blue"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/booking">
                <Button className="bg-medical-blue hover:bg-medical-dark text-white">
                  Book Now
                </Button>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {user?.isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <span className="text-sm text-gray-700">
                    {user?.firstName}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-medical-blue"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-medical-blue"
                  >
                    <User className="mr-1 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                          isActive(item.href)
                            ? "text-medical-blue"
                            : "text-gray-700 hover:text-medical-blue"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <Link href="/booking">
                    <Button
                      className="bg-medical-blue hover:bg-medical-dark text-white w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Book Now
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <div className="flex flex-col space-y-2">
                      {user?.isAdmin && (
                        <Link href="/admin">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsOpen(false)}
                          >
                            Admin Panel
                          </Button>
                        </Link>
                      )}
                      <span className="text-sm text-gray-700 px-3">
                        Welcome, {user?.firstName}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-medical-blue w-full"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="text-gray-700 hover:text-medical-blue w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="mr-1 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
