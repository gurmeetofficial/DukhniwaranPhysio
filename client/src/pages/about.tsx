import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";

export default function About() {
  const { data: teamMembers } = useQuery<any[]>({
    queryKey: ["/api/physiotherapists"],
  });

  const highlights = [
    "Licensed Professionals",
    "Modern Techniques",
    "Personalized Care",
    "Proven Results"
  ];

  return (
    <div className="py-16">
      <SEOHead
        title="About Us | Expert Physiotherapy Team in Panipat | Dukhniwaran Physiotherapy"
        description="Meet our expert physiotherapy team in Panipat. Dr. Sarah Miller, Dr. James Wilson, and Dr. Lisa Zhang provide specialized treatment with 15+ years of experience."
        keywords="physiotherapy team Panipat, Dr Sarah Miller physiotherapist, expert physiotherapists Panipat, about Dukhniwaran Physiotherapy, physiotherapy clinic team"
        schema={getArticleSchema("About Dukhniwaran Physiotherapy Team", "Professional physiotherapy team in Panipat with specialized expertise")}
      />
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance">
              About Dukhniwaran Physiotherapy - Panipat's Premier Clinic
            </h1>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed font-medium">
              With over a decade of experience in physiotherapy and rehabilitation, Dukhniwaran Physiotherapy has been serving Panipat and surrounding communities with dedication and expertise. Our clinic specializes in traditional and modern treatment methods to provide comprehensive healthcare solutions.
            </p>
            <p className="text-lg text-gray-800 mb-8 leading-relaxed font-medium">
              Our mission is to help patients in Panipat achieve optimal health and wellness through personalized treatment plans, compassionate care, and evidence-based practices. We believe in treating the whole person, not just the symptoms.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-medical-blue rounded-full p-2 mr-3">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-gray-800 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="static/PhysioImages/matPilates.webp"
              alt="Dukhniwaran Physiotherapy team working with patient in Panipat clinic"
              className="rounded-2xl shadow-custom w-full h-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12 text-balance">
            Meet Our Expert Physiotherapy Team in Panipat
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers?.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-custom transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role} at Dukhniwaran Physiotherapy Panipat`}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-medical-blue/20 shadow-lg"
                  />
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-medical-blue font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{member.description}</p>
                  <p className="text-gray-500 text-xs mt-auto">{member.experience} • {member.specializations}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
