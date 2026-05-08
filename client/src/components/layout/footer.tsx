import { Link } from "wouter";
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="page-container py-16">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-5">
              <Heart className="text-medical-blue h-7 w-7 mr-2" />
              <span className="text-xl font-bold text-white">Dukhniwaran Physiotherapy</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-md">
              Professional physiotherapy services in Panipat combining traditional techniques with modern treatment methods for comprehensive healthcare solutions.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/dukhniwaranphysio?igsh=MTJndDl0MnJjaTk3ZA=="
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/5"
                target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4 text-gray-400" />
              </a>
              <a href="https://www.instagram.com/dukhniwaranphysio?igsh=MTJndDl0MnJjaTk3ZA=="
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/5"
                target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-300">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Therapies", href: "/therapies" },
                { label: "Book Appointment", href: "/booking" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm inline-flex items-center group">
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-300">Contact Info</h4>
            <div className="space-y-4">
              <a href="tel:+917015017485" className="flex items-center group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-[hsl(210,100%,50%)] transition-colors">
                  <Phone className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">+91 7015017485</span>
              </a>
              <a href="mailto:dukhniwaranphysio@gmail.com" className="flex items-center group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-[hsl(210,100%,50%)] transition-colors">
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">dukhniwaranphysio@gmail.com</span>
              </a>
              <a href="https://maps.app.goo.gl/CVWdURwapgMLsYBP9" target="_blank" rel="noopener noreferrer"
                className="flex items-start group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-[hsl(210,100%,50%)] transition-colors shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm leading-relaxed">
                  736, opposite ekta park, near lucky bakery, Model Town, Panipat, Haryana 132103
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="page-container py-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Dukhniwaran Physiotherapy. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2 sm:mt-0">Panipat, Haryana</p>
        </div>
      </div>
    </footer>
  );
}
