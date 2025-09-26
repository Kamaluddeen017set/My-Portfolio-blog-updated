// src/components/LatestBlogs.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/LatestBlogs.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

function LatestBlogs({ page }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathname = usePathname();

  // Choose source: explicit prop > detect pathname
  const resolvedPage = page
    ? page
    : pathname?.startsWith("/blog/") || pathname?.startsWith("/blog")
    ? "details"
    : "home";

  // Fetch latest
  const fetchLatestBlogs = async (signal) => {
    if (!API_BASE_URL) {
      setError("API base URL not configured");
      setBlogs([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/blogs/latest`, { signal });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("fetchLatestBlogs error:", err);
        setError("Failed to load latest blogs");
        setBlogs([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch random / related
  const fetchRandomBlogs = async (signal) => {
    if (!API_BASE_URL) {
      setError("API base URL not configured");
      setBlogs([]);
      setLoading(false);
      return;
    }

    try {
      // <-- fixed to call random endpoint
      const res = await fetch(`${API_BASE_URL}/blogs/random`, { signal });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : [data]);
      setError(null);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("fetchRandomBlogs error:", err);
        setError("Failed to load related blogs");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // Decide which fetch to call
    if (resolvedPage === "details") {
      fetchRandomBlogs(controller.signal);
    } else if (resolvedPage === "home") {
      fetchLatestBlogs(controller.signal);
    } else {
      // default fallback (home)
      fetchLatestBlogs(controller.signal);
    }

    return () => controller.abort();
  }, [resolvedPage, pathname]);

  if (loading) {
    return (
      <div className="load-content">
        <div className="text">Loading~blogs...</div>
        <div className="text">Loading~blogs...</div>
      </div>
    );
  }

  return (
    <section className="latest-blogs-section fadeUp">
      <h2
        className={
          resolvedPage === "details" ? "explore_head" : "skills_heading"
        }
      >
        {resolvedPage === "details" ? "Explore more Blogs" : "Latest Blog"}
      </h2>
      <hr />
      {error && <p className="error">{error}</p>}
      <div className="latest-cards-wrapper">
        {blogs?.map((b) => (
          <div key={b._id || b.id} className="latest-blog-card">
            {b.image && <img src={b.image} alt={b.title} />}
            <h3>{b.title}</h3>
            <p>{(b.description || b.excerpt || "").slice(0, 100)}...</p>
            <Link href={`/blog/${b._id || b.id}`}>Read More</Link>
          </div>
        ))}
        <Link className="view_all_blog" href="/blog">
          View all
        </Link>
      </div>
    </section>
  );
}

export default LatestBlogs;
