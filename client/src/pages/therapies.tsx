import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import type { Therapy } from "@shared/schema";

export default function Therapies() {
  const { data: therapies, isLoading, error } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading therapies</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
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
    <div className="py-16 bg-gray-50">
      <SEOHead
        title="Physiotherapy Services in Panipat | Cupping, Dry Needling, IASTM | Dukhniwaran"
        description="Comprehensive physiotherapy services in Panipat including cupping therapy, dry needling, IASTM, sciatica treatment, frozen shoulder therapy, and postural correction. Expert care with proven results."
        keywords="cupping therapy Panipat, dry needling Panipat, IASTM therapy, sciatica treatment Panipat, frozen shoulder treatment, tennis elbow therapy, hijama therapy Panipat, postural correction therapy, physiotherapy services Panipat"
        schema={getArticleSchema("Physiotherapy Services in Panipat", "Complete range of physiotherapy treatments available in Panipat")}
      />
      <div className="page-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Specialized Therapies
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto font-medium">
            Comprehensive treatment options tailored to your specific needs and conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies?.map((therapy) => (
            <Card key={therapy.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <img
                src={therapyImages[therapy.name] || "static/PhysioImages/matPilates.webp"}
                alt={`${therapy.name} session`}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{therapy.name}</h3>
                <p className="text-gray-800 mb-4 font-medium flex-grow">{therapy.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-medical-blue font-semibold">
                    ₹{therapy.priceMin} - ₹{therapy.priceMax}
                  </span>
                  <Link href="/booking">
                    <Button className="bg-medical-blue hover:bg-medical-dark text-white">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
