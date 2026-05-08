import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { SEOHead, getBusinessSchema } from "@/components/seo/seo-head";
import { BMICalculator } from "@/components/tools/bmi-calculator";
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation";
import {
  UserCheck, Award, Heart, Star, CalendarCheck, Phone,
  Wrench, MapPin, ArrowRight, Shield, Clock, Zap,
  ChevronRight, Activity, Sparkles
} from "lucide-react";

function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: {
  children: React.ReactNode; className?: string;
  direction?: "up" | "left" | "right" | "scale"; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const dirClass = direction === "left" ? "scroll-reveal-left"
    : direction === "right" ? "scroll-reveal-right"
    : direction === "scale" ? "scroll-reveal-scale" : "scroll-reveal";
  return (
    <div ref={ref} className={`${dirClass} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

function StatCounter({ end, suffix = "", label, icon: Icon }: {
  end: number; suffix?: string; label: string; icon: any;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const count = useCountUp(end, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
        <Icon className="text-white h-6 w-6" />
      </div>
      <div className="text-4xl lg:text-5xl font-bold text-gray-900 stat-number mb-1">
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const testimonials = [
    { name: "ANKIT SHARMA", rating: 5, comment: "Thanks a lot for building that confidence and removing the fear post my ACL surgery. Your physio did help me, within a week I was able to do so many things and tasks with right exercises with right techniques. Indeed you go by your name Dukhnivaran!", role: "Verified Patient" },
    { name: "Amaninder Singh", rating: 5, comment: "One of the best place to get my physio done. I go to gym everyday and need regular physio. This is the place where i love to visit. I specially come from delhi to this place. God bless Dr. Jasmeet Singh. He is very intelligent and experienced.", role: "Verified Patient" },
    { name: "Inderjeet Singh", rating: 5, comment: "Great experience here coz Dr jasmeet treat patients as his family member so come here whenever you are in any type of pain nd you will definitely get relief!", role: "Verified Patient" },
  ];

  const services = [
    { icon: Activity, title: "Cupping Therapy", desc: "Ancient technique for muscle recovery and pain relief through suction therapy.", image: "/static/PhysioImages/cupping.webp" },
    { icon: Zap, title: "Dry Needling", desc: "Targeted trigger point release for deep muscular pain and tension.", image: "/static/PhysioImages/dryneedling.webp" },
    { icon: Shield, title: "IASTM Therapy", desc: "Instrument-assisted soft tissue mobilization for faster healing.", image: "/static/PhysioImages/IASTM.webp" },
    { icon: Heart, title: "Electrotherapy", desc: "Advanced electrical stimulation for pain management and recovery.", image: "/static/PhysioImages/electrotherapy.webp" },
    { icon: Sparkles, title: "Laser Therapy", desc: "Non-invasive light therapy for tissue repair and inflammation reduction.", image: "/static/PhysioImages/laserTherapy.webp" },
    { icon: Award, title: "Rehabilitation", desc: "Complete recovery programs tailored to your specific needs.", image: "/static/PhysioImages/Rehabilitation.webp" },
  ];

  return (
    <div>
      <SEOHead
        title="Best Physiotherapy Clinic in Panipat | Dukhniwaran Physiotherapy Center"
        description="Expert physiotherapy services in Panipat. Specializing in cupping therapy, dry needling, IASTM, sciatica treatment, frozen shoulder, and postural correction. Book appointment today!"
        keywords="physiotherapy Panipat, physiotherapist near me, cupping therapy Panipat, dry needling Panipat, IASTM therapy, sciatica treatment, frozen shoulder treatment, tennis elbow therapy, postural correction, hijama therapy Panipat, best physiotherapy clinic Panipat"
        schema={getBusinessSchema()}
      />

      {/* ===== Hero Section (Apple-style clean) ===== */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[hsl(210,100%,50%)] rounded-full blur-[180px] opacity-[0.07]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(152,69%,45%)] rounded-full blur-[150px] opacity-[0.05]" />

        <div className="relative page-container py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[hsl(210,100%,97%)] text-[hsl(210,100%,45%)] text-sm font-medium mb-6 border border-[hsl(210,100%,90%)]">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Trusted by 1000+ Patients in Panipat
              </div>
              <h1 className="font-heading text-[2.75rem] lg:text-[3.5rem] xl:text-6xl font-bold mb-6 leading-[1.08] tracking-tight">
                Professional{" "}
                <span className="gradient-text">Physiotherapy</span>{" "}
                Care in Panipat
              </h1>
              <p className="text-lg lg:text-xl mb-10 text-gray-500 leading-relaxed max-w-lg font-light">
                Expert treatment for pain relief, rehabilitation, and wellness.
                Our experienced team provides personalized care to help you recover
                and thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button className="btn-primary h-12 px-8 text-base">
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <a href="tel:+917015017485">
                  <Button className="btn-outline-primary h-12 px-8 text-base">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <img
                  src="/static/PhysioImages/cupping.webp"
                  alt="Modern physiotherapy clinic interior in Panipat with professional equipment"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 animate-float">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-[hsl(152,69%,45%)] to-[hsl(152,69%,38%)] rounded-xl p-3 mr-3">
                    <Award className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">Certified Professionals</p>
                    <p className="text-gray-400 text-xs">Licensed & Experienced</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Google Rating: 4.9</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Counter Section ===== */}
      <section className="py-20 bg-[hsl(220,14%,97%)] border-y border-gray-100">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={1000} suffix="+" label="Happy Patients" icon={UserCheck} />
            <StatCounter end={10} suffix="+" label="Years Experience" icon={Clock} />
            <StatCounter end={15} suffix="+" label="Therapy Types" icon={Activity} />
            <StatCounter end={5} suffix="★" label="Google Rating" icon={Star} />
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us (Apple-style) ===== */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</p>
            <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-4">
              Why Choose Dukhniwaran Physiotherapy?
            </h2>
            <div className="section-divider mt-4" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
              We combine traditional physiotherapy techniques with modern treatment
              methods for comprehensive care.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: UserCheck, title: "Expert Team", desc: "Certified physiotherapists with years of experience in treating various conditions and injuries.", color: "from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)]", shadow: "shadow-blue-500/15" },
              { icon: Wrench, title: "Modern Equipment", desc: "State-of-the-art physiotherapy equipment and facilities for effective treatment and recovery.", color: "from-[hsl(152,69%,45%)] to-[hsl(152,69%,38%)]", shadow: "shadow-green-500/15" },
              { icon: Heart, title: "Personalized Care", desc: "Tailored treatment plans designed specifically for your unique needs and recovery goals.", color: "from-[hsl(38,92%,50%)] to-[hsl(30,90%,45%)]", shadow: "shadow-orange-500/15" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="premium-card p-8 h-full text-center">
                  <div className={`bg-gradient-to-br ${item.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg ${item.shadow}`}>
                    <item.icon className="text-white h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services Showcase (PainFlame-style cards) ===== */}
      <section className="py-24 bg-[hsl(220,14%,97%)]">
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
            <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-4">
              Specialized Therapy Treatments
            </h2>
            <div className="section-divider mt-4" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Link href="/therapies">
                  <div className="premium-card group cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={service.image} alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <service.icon className="text-white h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 group-hover:text-[hsl(210,100%,50%)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{service.desc}</p>
                      <span className="text-[hsl(210,100%,50%)] text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link href="/therapies">
              <Button className="btn-primary h-12 px-8 text-base">
                View All Therapies <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BMI Calculator Section ===== */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Health Tool</p>
              <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-6">
                Check Your Body Mass Index
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Maintaining a healthy weight is crucial for your musculoskeletal health.
                Excess weight puts stress on joints, while being underweight affects bone density.
              </p>
              <div className="space-y-4">
                {["Instant calculation", "Health category insights", "Personalized recommendations"].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(152,69%,95%)] flex items-center justify-center mr-3">
                      <CalendarCheck className="h-4 w-4 text-[hsl(152,69%,40%)]" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <BMICalculator />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="py-24 bg-[hsl(220,14%,97%)]">
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <div className="section-divider mt-4" />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="premium-card p-8 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-400 text-sm">5.0</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-[15px]">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] rounded-full flex items-center justify-center mr-3 text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://maps.app.goo.gl/CVWdURwapgMLsYBP9" target="_blank" rel="noopener noreferrer"
                className="btn-outline-primary inline-flex items-center justify-center px-6 py-3 text-sm font-medium">
                View Google Reviews <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="https://maps.app.goo.gl/eA83GmCDmj9TuyWGA" target="_blank" rel="noopener noreferrer"
                className="btn-outline-primary inline-flex items-center justify-center px-6 py-3 text-sm font-medium">
                Leave a Review <Star className="ml-2 h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-20 bg-gradient-to-r from-[hsl(210,100%,50%)] to-[hsl(210,100%,38%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="relative page-container text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Recovery?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and take the first step towards a pain-free life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="bg-white text-[hsl(210,100%,45%)] hover:bg-gray-100 h-12 px-8 rounded-full text-base font-medium shadow-lg">
                  <CalendarCheck className="mr-2 h-5 w-5" /> Book Appointment
                </Button>
              </Link>
              <a href="tel:+917015017485">
                <Button className="bg-white/10 border border-white/30 hover:bg-white/20 text-white h-12 px-8 rounded-full text-base font-medium backdrop-blur-sm">
                  <Phone className="mr-2 h-5 w-5" /> +91-7015017485
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Social Media Feed ===== */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Follow Us</p>
            <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-4">
              Stay Connected
            </h2>
            <div className="section-divider mt-4" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal direction="left">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </span>
                  Instagram
                </h3>
                <div className="w-full flex justify-center h-[500px]">
                  <iframe src="https://www.instagram.com/p/DLtxeQIpkci/embed"
                    className="w-full max-w-[400px] h-full border border-gray-100 rounded-2xl shadow-sm"
                    frameBorder="0" scrolling="no" allowTransparency={true} title="Instagram Post" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </span>
                  YouTube
                </h3>
                <div className="w-full flex justify-center items-center h-[500px] bg-gray-50 rounded-2xl border border-gray-100">
                  <iframe className="w-full max-w-[560px] aspect-video rounded-xl shadow-sm"
                    src="https://www.youtube.com/embed/brL1Vnb_fnk" title="YouTube Video" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
