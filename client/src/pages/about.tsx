import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Award, Users, Target, Sparkles } from "lucide-react";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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

export default function About() {
  const { data: teamMembers } = useQuery<any[]>({
    queryKey: ["/api/physiotherapists"],
  });

  const highlights = [
    { icon: Award, text: "Licensed Professionals" },
    { icon: Sparkles, text: "Modern Techniques" },
    { icon: Users, text: "Personalized Care" },
    { icon: Target, text: "Proven Results" },
  ];

  return (
    <div>
      <SEOHead
        title="About Us | Expert Physiotherapy Team in Panipat | Dukhniwaran Physiotherapy"
        description="Meet our expert physiotherapy team in Panipat. Dr. Sarah Miller, Dr. James Wilson, and Dr. Lisa Zhang provide specialized treatment with 15+ years of experience."
        keywords="physiotherapy team Panipat, Dr Sarah Miller physiotherapist, expert physiotherapists Panipat, about Dukhniwaran Physiotherapy, physiotherapy clinic team"
        schema={getArticleSchema("About Dukhniwaran Physiotherapy Team", "Professional physiotherapy team in Panipat with specialized expertise")}
      />

      {/* Page Hero */}
      <section className="pt-16 pb-8 bg-[hsl(220,14%,97%)]">
        <div className="page-container text-center">
          <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Panipat's Premier Physiotherapy Clinic
          </h1>
          <div className="section-divider mt-4" />
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                With over a decade of experience in physiotherapy and rehabilitation, Dukhniwaran Physiotherapy has been serving Panipat and surrounding communities with dedication and expertise. Our clinic specializes in traditional and modern treatment methods to provide comprehensive healthcare solutions.
              </p>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                Our mission is to help patients achieve optimal health and wellness through personalized treatment plans, compassionate care, and evidence-based practices. We believe in treating the whole person, not just the symptoms.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-3 rounded-xl bg-[hsl(220,14%,97%)] border border-gray-100">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] flex items-center justify-center mr-3 shadow-sm">
                      <highlight.icon className="text-white h-4 w-4" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <img
                  src="static/PhysioImages/matPilates.webp"
                  alt="Dukhniwaran Physiotherapy team working with patient in Panipat clinic"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[hsl(220,14%,97%)]">
        <div className="page-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Our Team</p>
            <h2 className="font-heading text-3xl lg:text-[2.75rem] font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <div className="section-divider mt-4" />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers?.map((member, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="premium-card text-center p-8 h-full flex flex-col">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role} at Dukhniwaran Physiotherapy Panipat`}
                    className="w-28 h-28 rounded-full mx-auto mb-5 object-cover border-4 border-[hsl(210,100%,95%)] shadow-lg"
                  />
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[hsl(210,100%,50%)] font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{member.description}</p>
                  <p className="text-gray-400 text-xs mt-auto pt-4 border-t border-gray-100">
                    {member.experience} • {member.specializations}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
