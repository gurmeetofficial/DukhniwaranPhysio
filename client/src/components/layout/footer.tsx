import { Link } from "wouter";
import { Heart, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="text-medical-blue text-2xl mr-2" />
              <span className="text-xl font-bold">Dukhniwaran Physiotherapy</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Professional physiotherapy services combining traditional techniques with modern treatment methods for comprehensive healthcare solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-medical-blue transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/therapies">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Therapies</span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Book Appointment</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 9876543210
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@dukhniwaran.com
              </p>
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                123 Health Street<br />
                Medical District, City
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Dukhniwaran Physiotherapy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
