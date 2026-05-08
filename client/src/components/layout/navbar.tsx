import { useState, useEffect } from "react";
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
  Settings,
  X
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-white"
      }`}
    >
      {/* Top Contact Bar */}
      <div
        className={`bg-gradient-to-r from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] text-white overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 py-0" : "max-h-20 py-2"
        }`}
      >
        <div className="page-container">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-sm">
            <a
              href="tel:+917015017485"
              className="flex items-center mb-1 sm:mb-0 hover:text-white/80 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span className="font-medium">+91-7015017485</span>
            </a>
            <a
              href="https://maps.app.goo.gl/CVWdURwapgMLsYBP9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs sm:text-sm">736, opposite ekta park, near lucky bakery, Model Town, Panipat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="page-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Heart className="text-medical-blue h-7 w-7 mr-2" />
            <Link href="/">
              <span className="text-xl font-bold text-gray-900 cursor-pointer hover:text-medical-blue transition-colors tracking-tight">
                Dukhniwaran Physiotherapy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`nav-link px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-[hsl(210,100%,50%)] bg-[hsl(210,100%,97%)] active"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/booking">
                <Button className="btn-primary ml-3 px-6 h-9 text-sm">
                  Book Now
                </Button>
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[hsl(210,100%,95%)] text-[hsl(210,100%,50%)] text-sm font-semibold">
                          {user?.firstName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-xl shadow-lg border-gray-100" align="end" forceMount>
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
                    className="text-gray-600 hover:text-gray-900 ml-1 h-9 rounded-full"
                  >
                    <User className="mr-1.5 h-4 w-4" />
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
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white border-l border-gray-100">
                <div className="flex flex-col space-y-2 mt-6">
                  <Link href="/">
                    <span
                      className="flex items-center px-3 py-3 mb-4 border-b border-gray-100 pb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="text-medical-blue h-6 w-6 mr-2" />
                      <span className="text-lg font-bold text-gray-900">
                        Dukhniwaran Physio
                      </span>
                    </span>
                  </Link>

                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-all ${
                          isActive(item.href)
                            ? "bg-[hsl(210,100%,97%)] text-[hsl(210,100%,50%)]"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  
                  <Link href="/booking">
                    <Button
                      className="btn-primary w-full mt-4 h-11"
                      onClick={() => setIsOpen(false)}
                    >
                      Book Now
                    </Button>
                  </Link>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    {isAuthenticated ? (
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center px-3 mb-2">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-[hsl(210,100%,95%)] text-[hsl(210,100%,50%)]">
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
                              className="w-full justify-start rounded-xl"
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
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl"
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
