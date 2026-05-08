import { BookOpen, PlusCircle, Search, Tag, ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

function ScrollReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

const BLOG_IMAGES: Record<string, string> = {
  "Hijama_Therapy": "/static/PhysioImages/Hijama.webp",
  "Hijama": "/static/PhysioImages/Hijama.webp",
  "Cupping": "/static/PhysioImages/cupping.webp",
  "cervical-spondylosis-neck-stiffness": "/static/PhysioImages/chiropractic.webp",
  "dry-needling": "/static/PhysioImages/dryneedling.webp",
  "electrotherapy": "/static/PhysioImages/electrotherapy.webp",
  "frozen-shoulder-rotator-cuff": "/static/PhysioImages/Rehabilitation.webp",
  "iastm": "/static/PhysioImages/InjuryPreventionPrograms .webp",
  "knee-hip-osteoarthritis": "/static/PhysioImages/Rehabilitation.webp",
  "laser-therapy": "/static/PhysioImages/laserTherapy.webp",
  "rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "rheumatoid-arthritis": "/static/PhysioImages/Rehabilitation.webp",
  "slipped-disc-back-pain": "/static/PhysioImages/chiropractic.webp",
  "tennis-elbow-golfers-elbow-carpal-tunnel": "/static/PhysioImages/Rehabilitation.webp",
  "heel-pain-plantar-fasciitis": "/static/PhysioImages/Rehabilitation.webp",
  "post-fracture-rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "stroke-rehabilitation-paralysis": "/static/PhysioImages/Rehabilitation.webp",
  "parkinsons-disease-mobility": "/static/PhysioImages/Rehabilitation.webp",
  "multiple-sclerosis-movement": "/static/PhysioImages/Rehabilitation.webp",
  "cerebral-palsy-rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "bells-palsy-facial-paralysis": "/static/PhysioImages/Rehabilitation.webp",
  "spinal-cord-injury-rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "balance-ataxia-vertigo": "/static/PhysioImages/Rehabilitation.webp",
  "sports-injuries-rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "cardiovascular-respiratory-physiotherapy": "/static/PhysioImages/Rehabilitation.webp",
  "post-surgical-rehabilitation": "/static/PhysioImages/Rehabilitation.webp",
  "pediatric-physiotherapy": "/static/PhysioImages/Rehabilitation.webp",
  "geriatric-physiotherapy": "/static/PhysioImages/Rehabilitation.webp",
  "womens-health-physiotherapy": "/static/PhysioImages/Rehabilitation.webp",
};
const DEFAULT_IMAGE = "/static/PhysioImages/cupping.webp";

// Color accents for blog cards — cycles through these
const CATEGORY_COLORS = [
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
  { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<{ filename: string; title: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setBlogs([]);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SEOHead
        title="Physiotherapy Blog | Expert Health Tips | Dukhniwaran Physiotherapy"
        description="Read expert physiotherapy articles, health tips, and treatment guides from Dukhniwaran Physiotherapy Panipat."
        keywords="physiotherapy blog, health tips, treatment guides, pain relief articles"
        schema={getArticleSchema("Physiotherapy Blog", "Expert health articles from Dukhniwaran Physiotherapy")}
      />

      {/* Page Hero */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-[hsl(220,14%,97%)] to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[hsl(210,100%,50%)] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="relative page-container text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[hsl(210,100%,97%)] text-[hsl(210,100%,45%)] text-sm font-medium mb-5 border border-[hsl(210,100%,90%)]">
            <BookOpen className="h-3.5 w-3.5 mr-2" />
            Knowledge Hub
          </div>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Physiotherapy Blog
          </h1>
          <div className="section-divider mt-4" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed">
            Expert articles, treatment guides, and health tips to help you understand 
            and manage your physical wellbeing.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mt-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] focus:border-[hsl(210,100%,70%)] transition-all text-gray-700 placeholder:text-gray-400"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Add Blog Button (admin only) */}
          {isAuthenticated && (
            <div className="mt-6">
              <Button
                className="btn-primary px-6 h-10"
                onClick={() => setShowAdd((v) => !v)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                {showAdd ? "Hide Form" : "Add Blog"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Add Blog Form */}
      {showAdd && (
        <div className="page-container max-w-3xl py-8">
          <AddBlogForm onSuccess={() => setShowAdd(false)} />
        </div>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="page-container">
          {/* Results count */}
          {search && (
            <p className="text-sm text-gray-400 mb-8">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found for "{search}"
            </p>
          )}

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {search
                  ? `We couldn't find any articles matching "${search}". Try a different search term.`
                  : "Check back soon — we're working on new content!"}
              </p>
              {search && (
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Featured / First Blog */}
              {filteredBlogs.length > 0 && (
                <ScrollReveal className="mb-12">
                  <FeaturedBlogCard blog={filteredBlogs[0]} />
                </ScrollReveal>
              )}

              {/* Remaining Blogs Grid */}
              {filteredBlogs.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.slice(1).map((blog, index) => {
                    const colorSet = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
                    return (
                      <ScrollReveal key={blog.filename} delay={(index % 3) * 120}>
                        <BlogCard blog={blog} colorSet={colorSet} />
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

/* ===== Featured Blog Card (Large) ===== */
function FeaturedBlogCard({ blog }: { blog: { filename: string; title: string } }) {
  const slug = blog.filename.replace(/\.html$/, "");
  const img = BLOG_IMAGES[slug] || DEFAULT_IMAGE;
  const href = blog.filename.endsWith('.html') ? `/blogs/${blog.filename}` : `/blogs/${blog.filename}.html`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group block premium-card overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
          <img src={img} alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[hsl(210,100%,45%)]">
              Featured Article
            </span>
          </div>
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Tag className="h-3.5 w-3.5" /> Physiotherapy
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Clock className="h-3.5 w-3.5" /> 5 min read
            </span>
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[hsl(210,100%,50%)] transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Read our in-depth article about {blog.title.toLowerCase().replace(/:.*$/, "")} — expert insights and treatment approaches from our physiotherapy team.
          </p>
          <span className="inline-flex items-center text-[hsl(210,100%,50%)] font-semibold text-sm group-hover:gap-3 transition-all">
            Read Full Article <ArrowRight className="h-4 w-4 ml-2" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ===== Regular Blog Card ===== */
function BlogCard({ blog, colorSet }: {
  blog: { filename: string; title: string };
  colorSet: { bg: string; text: string; border: string };
}) {
  const slug = blog.filename.replace(/\.html$/, "");
  const img = BLOG_IMAGES[slug] || DEFAULT_IMAGE;
  const href = blog.filename.endsWith('.html') ? `/blogs/${blog.filename}` : `/blogs/${blog.filename}.html`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group premium-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img src={img} alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorSet.bg} ${colorSet.text}`}>
            <Tag className="h-3 w-3" /> Physiotherapy
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 4 min
          </span>
        </div>
        <h3 className="font-heading text-base font-semibold text-gray-900 mb-2 leading-snug group-hover:text-[hsl(210,100%,50%)] transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow mb-4">
          Read more about {blog.title.toLowerCase().replace(/:.*$/, "")}
        </p>
        <span className="inline-flex items-center text-[hsl(210,100%,50%)] font-medium text-sm mt-auto group-hover:gap-2 transition-all">
          Read More <ChevronRight className="h-4 w-4 ml-1" />
        </span>
      </div>
    </a>
  );
}

/* ===== Add Blog Form ===== */
function AddBlogForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, html })
    });
    if (res.ok) {
      setTitle("");
      setHtml("");
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.message || "Error adding blog");
    }
    setLoading(false);
  };

  return (
    <div className="premium-card p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <PlusCircle className="h-5 w-5 text-[hsl(210,100%,50%)]" />
        Add New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">Title</label>
          <input
            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] focus:border-[hsl(210,100%,70%)] transition-all"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Blog title"
          />
        </div>
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">HTML Content</label>
          <textarea
            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl min-h-[160px] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(210,100%,85%)] focus:border-[hsl(210,100%,70%)] transition-all font-mono"
            value={html}
            onChange={e => setHtml(e.target.value)}
            required
            placeholder="Paste your HTML content here..."
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-xl border border-red-100">{error}</div>
        )}
        <Button type="submit" disabled={loading} className="btn-primary h-11 px-8">
          {loading ? "Saving..." : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
}
