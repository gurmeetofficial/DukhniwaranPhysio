import { BookOpen, PlusCircle, Search, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

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
    <div className="page-container max-w-5xl py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-medical-blue" />
          <h1 className="text-3xl font-bold">Physiotherapy Blog</h1>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blogs..."
              className="border rounded px-3 py-1 pl-9 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ minWidth: 180 }}
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button
            className="flex items-center gap-2 bg-medical-blue hover:bg-blue-700 text-white"
            onClick={() => setShowAdd((v) => !v)}
          >
            <PlusCircle className="h-5 w-5" />
            {showAdd ? "Hide Add Blog" : "Add Blog"}
          </Button>
        </div>
      </div>
      {showAdd && <AddBlogForm onSuccess={() => setShowAdd(false)} />}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No blogs found.
          </div>
        )}
        {filteredBlogs.map((blog) => {
          const slug = blog.filename.replace(/\.html$/, "");
          const img = BLOG_IMAGES[slug] || DEFAULT_IMAGE;
          // Optionally, you can add categories/tags here if available in blog data
          return (
            <div
              key={blog.filename}
              className="rounded-xl shadow bg-white p-0 flex flex-col justify-between h-full border border-gray-100 hover:shadow-xl transition-shadow group overflow-hidden"
            >
              <a
                href={blog.filename.endsWith('.html') ? `/blogs/${blog.filename}` : `/blogs/${blog.filename}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={img}
                  alt={blog.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                  }}
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-medical-blue group-hover:underline mb-1">
                    {blog.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Tag className="h-4 w-4" />
                    {/* Example: Add category here if available */}
                    <span>Physiotherapy</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    Read more about {blog.title.toLowerCase().replace(/:.*$/, "")}
                  </p>
                </div>
              </a>
              <a
                href={blog.filename.endsWith('.html') ? `/blogs/${blog.filename}` : `/blogs/${blog.filename}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-medical-blue text-white text-center py-2 font-medium hover:bg-blue-700 transition-colors"
              >
                Read Blog
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Add New Blog</h2>
      <div className="mb-2">
        <label className="block mb-1 font-medium">Title</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium">HTML Content</label>
        <textarea
          className="w-full border px-2 py-1 rounded min-h-[120px]"
          value={html}
          onChange={e => setHtml(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Blog"}
      </Button>
    </form>
  );
}
