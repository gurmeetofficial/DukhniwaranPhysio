import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Dr. Sarah Miller",
      role: "Lead Physiotherapist",
      description: "15+ years experience in orthopedic rehabilitation and sports injury treatment.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Dr. James Wilson", 
      role: "Senior Therapist",
      description: "Specialist in manual therapy, dry needling, and chronic pain management.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Dr. Lisa Zhang",
      role: "Rehabilitation Specialist", 
      description: "Expert in neurological rehabilitation and postural correction therapy.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ];

  const highlights = [
    "Licensed Professionals",
    "Modern Techniques", 
    "Personalized Care",
    "Proven Results"
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              About Dukhniwaran Physiotherapy
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over a decade of experience in physiotherapy and rehabilitation, Dukhniwaran Physiotherapy has been serving the community with dedication and expertise. Our clinic specializes in traditional and modern treatment methods to provide comprehensive healthcare solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to help patients achieve optimal health and wellness through personalized treatment plans, compassionate care, and evidence-based practices. We believe in treating the whole person, not just the symptoms.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-medical-blue rounded-full p-2 mr-3">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Physiotherapy team working with patient" 
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Expert Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img 
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-medical-blue font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
