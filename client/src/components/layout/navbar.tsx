import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Heart,
  Menu,
  User,
  Phone,
  MapPin,
  LogOut,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Therapies", href: "/therapies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return location === href || location?.startsWith(href + "/");
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Contact Info Bar */}
      <div className="bg-medical-blue text-white py-2 text-sm">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <a
              href="tel:+917015017485"
              className="flex items-center mb-1 sm:mb-0 hover:text-white/80 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+91-7015017485</span>
            </a>
            <a
              href="https://maps.app.goo.gl/CVWdURwapgMLsYBP9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2" />
              <span>736, opposite ekta park, near lucky bakery, Model Town, Panipat, Haryana 132103</span>
            </a>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Heart className="text-medical-blue text-2xl mr-2" />
            <Link href="/">
              <span className="text-xl font-bold text-gray-900 cursor-pointer hover:text-medical-blue transition-colors">
                Dukhniwaran Physiotherapy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${isActive(item.href)
                      ? "text-medical-blue font-semibold scale-105"
                      : "text-gray-700 hover:text-medical-blue hover:bg-blue-50"
                      }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/booking">
                <Button className="bg-medical-blue hover:bg-medical-dark text-white ml-2 shadow-sm hover:shadow-md transition-all">
                  Book Now
                </Button>
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-medical-blue/10 text-medical-blue">
                          {user?.firstName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer w-full flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-medical-blue ml-2"
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
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/">
                    <span
                      className="block px-3 py-2 text-lg font-bold text-medical-blue border-b pb-4 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Dukhniwaran Physio
                    </span>
                  </Link>
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${isActive(item.href)
                          ? "bg-blue-50 text-medical-blue"
                          : "text-gray-700 hover:text-medical-blue hover:bg-gray-50"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <Link href="/booking">
                    <Button
                      className="bg-medical-blue hover:bg-medical-dark text-white w-full mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Book Now
                    </Button>
                  </Link>

                  <div className="border-t pt-4 mt-4">
                    {isAuthenticated ? (
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center px-3 mb-2">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-medical-blue/10 text-medical-blue">
                              {user?.firstName?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user?.firstName}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user?.email}</p>
                          </div>
                        </div>

                        {user?.isAdmin && (
                          <Link href="/admin">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => setIsOpen(false)}
                            >
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Admin Panel
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Login
                        </Button>
                      </Link>
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
