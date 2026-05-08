import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowRight } from "lucide-react";
import type { Therapy } from "@shared/schema";

function ScrollReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

export default function Therapies() {
  const { data: therapies, isLoading, error } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="page-container text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading therapies</h2>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  const therapyImages: Record<string, string> = {
    "Cupping Therapy": "/static/PhysioImages/cupping.webp",
    "Hijama Therapy": "/static/PhysioImages/Hijama.webp",
    "IASTM Therapy": "/static/PhysioImages/IASTM.webp",
    "Dry Needling": "/static/PhysioImages/dryneedling.webp",
    "Tennis Elbow Treatment": "/static/PhysioImages/chiropractic.webp",
    "Sciatica Treatment": "/static/PhysioImages/chiropractic.webp",
    "Frozen Shoulder": "/static/PhysioImages/chiropractic.webp",
    "Posture Correction": "/static/PhysioImages/chiropractic.webp",
    "Electrotherapy": "/static/PhysioImages/electrotherapy.webp",
    "Laser Therapy": "/static/PhysioImages/laserTherapy.webp",
    "Mat Pilates": "/static/PhysioImages/matPilates.webp",
    "Rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
    "Diet Consultation": "/static/PhysioImages/diet.webp",
    "Injury Prevention Programs": "/static/PhysioImages/InjuryPreventionPrograms%20.webp",
    // Add more mappings as needed
  };

  return (
    <div>
      <SEOHead
        title="Physiotherapy Services in Panipat | Cupping, Dry Needling, IASTM | Dukhniwaran"
        description="Comprehensive physiotherapy services in Panipat including cupping therapy, dry needling, IASTM, sciatica treatment, frozen shoulder therapy, and postural correction. Expert care with proven results."
        keywords="cupping therapy Panipat, dry needling Panipat, IASTM therapy, sciatica treatment Panipat, frozen shoulder treatment, tennis elbow therapy, hijama therapy Panipat, postural correction therapy, physiotherapy services Panipat"
        schema={getArticleSchema("Physiotherapy Services in Panipat", "Complete range of physiotherapy treatments available in Panipat")}
      />

      {/* Page Hero */}
      <section className="pt-16 pb-8 bg-[hsl(220,14%,97%)]">
        <div className="page-container text-center">
          <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Specialized Therapies
          </h1>
          <div className="section-divider mt-4" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6">
            Comprehensive treatment options tailored to your specific needs and conditions
          </p>
        </div>
      </section>

      {/* Therapy Cards */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapies?.map((therapy, index) => (
              <ScrollReveal key={therapy.id} delay={(index % 3) * 120}>
                <div className="premium-card group h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={therapyImages[therapy.name] || "static/PhysioImages/matPilates.webp"}
                      alt={`${therapy.name} session`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 group-hover:text-[hsl(210,100%,50%)] transition-colors">
                      {therapy.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">{therapy.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-[hsl(210,100%,50%)] font-semibold text-sm">
                        ₹{therapy.priceMin} - ₹{therapy.priceMax}
                      </span>
                      <Link href="/booking">
                        <Button className="btn-primary h-9 px-5 text-sm">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
