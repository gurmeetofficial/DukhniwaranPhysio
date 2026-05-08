import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Edit, PlusCircle } from "lucide-react";
import type { Therapy } from "@shared/schema";
import { useAuth } from "@/components/auth/auth-provider";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

function ScrollReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

function EditTherapyDialog({ therapy }: { therapy: Therapy }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: therapy.name,
    description: therapy.description,
    priceMin: therapy.priceMin,
    priceMax: therapy.priceMax,
    duration: therapy.duration,
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("PUT", `/api/therapies/${therapy.id}`, {
        ...formData,
        priceMin: Number(formData.priceMin),
        priceMax: Number(formData.priceMax),
        duration: Number(formData.duration),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
      toast({ title: "Success", description: "Therapy updated successfully." });
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-white/90 hover:bg-white z-10 rounded-full h-9 w-9 p-0 shadow-sm border border-gray-200">
          <Edit className="h-4 w-4 text-[hsl(210,100%,50%)]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Therapy</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Min Price (₹)</label>
              <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.priceMin} onChange={e => setFormData({ ...formData, priceMin: parseInt(e.target.value) || 0 })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Max Price (₹)</label>
              <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.priceMax} onChange={e => setFormData({ ...formData, priceMax: parseInt(e.target.value) || 0 })} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Duration (mins)</label>
            <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.duration} onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })} required />
          </div>
          <Button type="submit" className="w-full btn-primary h-11" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddTherapyForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: "", description: "", priceMin: 0, priceMax: 0, duration: 45
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("POST", `/api/therapies`, {
        ...formData,
        priceMin: Number(formData.priceMin),
        priceMax: Number(formData.priceMax),
        duration: Number(formData.duration),
        isActive: true,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
      toast({ title: "Success", description: "Therapy added successfully." });
      setFormData({ name: "", description: "", priceMin: 0, priceMax: 0, duration: 45 });
      onSuccess();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-card p-8 mb-12">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><PlusCircle className="h-5 w-5 text-[hsl(210,100%,50%)]" /> Add New Therapy</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Name</label>
          <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="E.g., Cupping Therapy" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Description</label>
          <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required placeholder="Enter a detailed description..." />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Min Price (₹)</label>
            <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.priceMin || ""} onChange={e => setFormData({ ...formData, priceMin: parseInt(e.target.value) || 0 })} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Max Price (₹)</label>
            <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.priceMax || ""} onChange={e => setFormData({ ...formData, priceMax: parseInt(e.target.value) || 0 })} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700">Duration (mins)</label>
          <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] transition-all" value={formData.duration || ""} onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })} required />
        </div>
        <Button type="submit" className="w-full btn-primary h-11" disabled={loading}>
          {loading ? "Adding..." : "Add Therapy"}
        </Button>
      </form>
    </div>
  );
}

export default function Therapies() {
  const { data: therapies, isLoading, error } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });
  const { user } = useAuth();
  const [showAdd, setShowAdd] = useState(false);

  // Check if admin
  const isAdmin = user?.isAdmin;

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
      <section className="pt-16 pb-12 bg-[hsl(220,14%,97%)]">
        <div className="page-container text-center">
          <p className="text-[hsl(210,100%,50%)] font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Specialized Therapies
          </h1>
          <div className="section-divider mt-4" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6">
            Comprehensive treatment options tailored to your specific needs and conditions
          </p>

          {isAdmin && (
            <div className="mt-8">
              <Button onClick={() => setShowAdd(!showAdd)} className="btn-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                {showAdd ? "Cancel" : "Add New Therapy"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Therapy Cards */}
      <section className="py-20 bg-white">
        <div className="page-container">
          
          {showAdd && isAdmin && (
            <AddTherapyForm onSuccess={() => setShowAdd(false)} />
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapies?.map((therapy, index) => (
              <ScrollReveal key={therapy.id} delay={(index % 3) * 120}>
                <div className="premium-card group h-full flex flex-col relative">
                  
                  {/* Edit Button for Admins */}
                  {isAdmin && <EditTherapyDialog therapy={therapy} />}

                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={therapyImages[therapy.name] || "/static/PhysioImages/matPilates.webp"}
                      alt={`${therapy.name} session`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 group-hover:text-[hsl(210,100%,50%)] transition-colors pr-8">
                      {therapy.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow whitespace-pre-line">{therapy.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-[hsl(210,100%,50%)] font-semibold text-sm">
                        ₹{therapy.priceMin} - ₹{therapy.priceMax}
                      </span>
                      <Link href={`/booking?therapy=${encodeURIComponent(therapy.id)}`}>
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
