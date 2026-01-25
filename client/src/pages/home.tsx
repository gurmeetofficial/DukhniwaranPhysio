import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { SEOHead, getBusinessSchema } from "@/components/seo/seo-head";
import { 
  UserCheck, 
  Award, 
  Heart, 
  Star, 
  CalendarCheck, 
  Phone,
  Wrench,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const testimonials = [
    {
      name: "ANKIT SHARMA",
      rating: 5,
      comment: "Thanks a lot for building that confidence and removing the fear post my ACL surgery. Your physio did help me, within a week I was able to do so many things and tasks with right exercises with right techniques. Indeed you go by your name Dukhnivaran, curing the things in a perfect manner!",
      role: "Verified Patient"
    },
    {
      name: "Amaninder Singh", 
      rating: 5,
      comment: "One of the best place to get my physio done. I go to gym everyday and need regular physio. This is the place where i love to visit. I specially come from delhi to this place. God bless Dr. Jasmeet Singh. He is very intelligent and experienced.",
      role: "Verified Patient"
    },
    {
      name: "Inderjeet Singh",
      rating: 5,
      comment: "Great experience here coz Dr jasmeet treat patients as his family member so come here whenever you are in any type of pain nd you will definitely get relief!",
      role: "Verified Patient"
    }
  ];

  return (
    <div>
      <SEOHead
        title="Best Physiotherapy Clinic in Panipat | Dukhniwaran Physiotherapy Center"
        description="Expert physiotherapy services in Panipat. Specializing in cupping therapy, dry needling, IASTM, sciatica treatment, frozen shoulder, and postural correction. Book appointment today!"
        keywords="physiotherapy Panipat, physiotherapist near me, cupping therapy Panipat, dry needling Panipat, IASTM therapy, sciatica treatment, frozen shoulder treatment, tennis elbow therapy, postural correction, hijama therapy Panipat, best physiotherapy clinic Panipat"
        schema={getBusinessSchema()}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-blue via-medical-dark to-blue-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
                Professional <span className="gradient-text">Physiotherapy</span> Care in Panipat
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed font-light">
                Expert treatment for pain relief, rehabilitation, and wellness. Our experienced team provides personalized physiotherapy care to help you recover and thrive with advanced techniques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-medical-green hover:bg-green-600 text-white">
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-medical-blue">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src="static/PhysioImages/cupping.webp" 
                alt="Modern physiotherapy clinic interior in Panipat with professional equipment" 
                className="rounded-2xl shadow-custom w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg backdrop-blur-custom">
                <div className="flex items-center">
                  <div className="bg-medical-green rounded-full p-3 mr-4">
                    <Award className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold font-heading">Certified Professionals</p>
                    <p className="text-gray-600 text-sm">Licensed & Experienced in Panipat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <div className="bg-medical-blue text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-lg font-semibold">Call Now: +91-7015017485</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-2" />
                <span>736, opposite ekta park, near lucky bakery, Model Town, Panipat, Haryana 132103, Haryana</span>
              </div>
            </div>
            <Link href="/booking">
              <Button variant="secondary" size="lg" className="bg-white text-medical-blue hover:bg-gray-100">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Clinic Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Why Choose Dukhniwaran Physiotherapy in Panipat?
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium">
              We combine traditional physiotherapy techniques with modern treatment methods to provide comprehensive care for all your rehabilitation needs in Panipat and surrounding areas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-custom transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-medical-blue to-medical-dark rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <UserCheck className="text-white h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Expert Team in Panipat</h3>
                <p className="text-gray-800 leading-relaxed font-medium">
                  Certified physiotherapists with years of experience in treating various conditions and injuries in Panipat region.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-custom transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-medical-green to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Wrench className="text-white h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Modern Equipment</h3>
                <p className="text-gray-800 leading-relaxed font-medium">
                  State-of-the-art physiotherapy equipment and facilities for effective treatment and recovery in Panipat.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-custom transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-medical-orange to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="text-white h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">Personalized Care</h3>
                <p className="text-gray-800 leading-relaxed font-medium">
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
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
              What Our Patients Say About Dukhniwaran Physiotherapy
            </h2>
            <p className="text-xl text-gray-800 font-medium">Real experiences from our satisfied patients in Panipat</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-custom transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm font-medium">5.0</span>
                  </div>
                  <p className="text-gray-800 mb-4 leading-relaxed italic font-medium">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-medical-blue to-medical-dark rounded-full flex items-center justify-center mr-3">
                      <UserCheck className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-800 mb-4 font-medium">See more reviews on Google Maps:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://maps.app.goo.gl/CVWdURwapgMLsYBP9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white rounded-lg transition-colors font-medium"
              >
                View Google Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="https://maps.app.goo.gl/eA83GmCDmj9TuyWGA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white rounded-lg transition-colors font-medium"
              >
                Leave a Review
                <Star className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram & YouTube Feed Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Instagram */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-medical-blue">Follow Us On Instagram</h2>
            <div className="flex justify-center">
              <iframe
                src="https://www.instagram.com/p/DLtxeQIpkci/embed"
                width="400"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                title="Instagram Post"
                style={{ borderRadius: '12px', border: '1px solid #e6e6e6' }}
              ></iframe>
            </div>
          </div>
          {/* YouTube */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Watch Us On YouTube</h2>
            <div className="flex justify-center">
              <iframe
                width="400"
                height="225"
                src="https://www.youtube.com/embed/brL1Vnb_fnk"
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: '12px', border: '1px solid #e6e6e6' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
