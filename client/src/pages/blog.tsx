import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<{ filename: string; title: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setBlogs([]);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {(
        <Button className="mb-6" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? "Hide Add Blog" : "Add Blog"}
        </Button>
      )}
      {showAdd && <AddBlogForm onSuccess={() => setShowAdd(false)} />}
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.filename}>
            <a
              href={`/blogs/${blog.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline"
            >
              {blog.title}
            </a>
          </li>
        ))}
      </ul>
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
