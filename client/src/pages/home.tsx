import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  UserCheck, 
  Award, 
  Heart, 
  Star, 
  CalendarCheck, 
  Phone,
  Wrench
} from "lucide-react";

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent treatment for my back pain. The staff is professional and caring. Highly recommend!",
      role: "Patient"
    },
    {
      name: "Michael Chen", 
      rating: 5,
      comment: "Great experience with dry needling therapy. My shoulder pain is completely gone now!",
      role: "Patient"
    },
    {
      name: "Priya Patel",
      rating: 5,
      comment: "Professional service and effective treatment. The cupping therapy worked wonders for my muscle tension.",
      role: "Patient"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-medical-blue to-medical-dark text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional <span className="text-medical-green">Physiotherapy</span> Care
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Expert treatment for pain relief, rehabilitation, and wellness. Our experienced team provides personalized care to help you recover and thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-medical-green hover:bg-green-600 text-white">
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-medical-blue">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern physiotherapy clinic interior" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="bg-medical-green rounded-full p-3 mr-4">
                    <Award className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">Certified Professionals</p>
                    <p className="text-gray-600 text-sm">Licensed & Experienced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Dukhniwaran Physiotherapy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional physiotherapy techniques with modern treatment methods to provide comprehensive care for all your rehabilitation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-medical-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">
                  Certified physiotherapists with years of experience in treating various conditions and injuries.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-medical-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Equipment</h3>
                <p className="text-gray-600">
                  State-of-the-art physiotherapy equipment and facilities for effective treatment and recovery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-medical-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Care</h3>
                <p className="text-gray-600">
                  Tailored treatment plans designed specifically for your unique needs and recovery goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600">Real experiences from our satisfied patients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">5.0</span>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <UserCheck className="text-gray-600 h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
