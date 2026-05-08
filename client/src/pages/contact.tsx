import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import type { InsertContact } from "@shared/schema";

function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: {
  children: React.ReactNode; className?: string;
  direction?: "up" | "left" | "right"; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const dirClass = direction === "left" ? "scroll-reveal-left"
    : direction === "right" ? "scroll-reveal-right" : "scroll-reveal";
  return (
    <div ref={ref} className={`${dirClass} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Message sent successfully!", description: "We'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({ title: "Error sending message", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); contactMutation.mutate(formData); };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: MapPin, title: "Address", content: "736, opposite ekta park, near lucky bakery, Model Town, Panipat, Haryana 132103",
      href: "https://maps.app.goo.gl/CVWdURwapgMLsYBP9", external: true },
    { icon: Phone, title: "Phone", content: "+91 7015017485", href: "tel:+917015017485" },
    { icon: Mail, title: "Email", content: "dukhniwaranphysio@gmail.com", href: "mailto:dukhniwaranphysio@gmail.com" },
    { icon: Clock, title: "Working Hours", content: "Mon-Sat: 9AM-2PM, 4:30PM-7PM | Sun: 9AM-2PM" },
  ];

  return (
    <div>
      <SEOHead
        title="Contact Dukhniwaran Physiotherapy Clinic Panipat | Book Appointment"
        description="Contact Dukhniwaran Physiotherapy in Panipat. Call +91-7015017485 for appointments."
        keywords="contact physiotherapy Panipat, Dukhniwaran Physiotherapy address"
        schema={getArticleSchema("Contact Dukhniwaran Physiotherapy", "Get in touch with our physiotherapy clinic in Panipat")}
      />

      {/* Page Hero */}
      <section className="pt-16 pb-8 bg-[hsl(220,14%,97%)]">
        <div className="page-container text-center">
          <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Get In Touch</p>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <div className="section-divider mt-4" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6">
            Get in touch with our team for any questions or to schedule an appointment
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <div key={i}>
                    {item.href ? (
                      <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-start p-4 rounded-2xl hover:bg-[hsl(220,14%,97%)] transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-all shrink-0">
                          <item.icon className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start p-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,42%)] flex items-center justify-center mr-4 shadow-sm shrink-0">
                          <item.icon className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <div className="premium-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange}
                        required placeholder="Your full name" className="mt-1.5 rounded-xl h-11" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                        placeholder="Your phone number" className="mt-1.5 rounded-xl h-11" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange}
                      required placeholder="Your email address" className="mt-1.5 rounded-xl h-11" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange}
                      required placeholder="Message subject" className="mt-1.5 rounded-xl h-11" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange}
                      required rows={5} placeholder="Your message" className="mt-1.5 rounded-xl" />
                  </div>
                  <Button type="submit" disabled={contactMutation.isPending}
                    className="btn-primary w-full h-11 text-base">
                    <Send className="mr-2 h-4 w-4" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Google Maps */}
          <ScrollReveal className="mt-16">
            <div className="premium-card p-6">
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Find Us Here</h3>
              <div className="w-full h-96 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27998.594991064587!2d76.9635!3d29.3909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390deb2e5f0b0e3b%3A0x4e5b0b0b0b0b0b0b!2sPanipat%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dukhniwaran Physiotherapy Clinic Location in Panipat" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
