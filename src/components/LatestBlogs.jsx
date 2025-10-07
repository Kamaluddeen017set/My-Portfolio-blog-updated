"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/LatestBlogs.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper for initial SSR fetch
async function getInitialBlogs(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${endpoint}`, {
      cache: "no-store", // SSR fresh fetch
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    console.error("SSR fetch error:", err);
    return [];
  }
}

export default function LatestBlogs({ page = "home", initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);

  const endpoint = page === "details" ? "random" : "latest";

  // Client refresh every 30s
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/blogs/${endpoint}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Client refresh error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch once on mount
    fetchBlogs();

    // Then re-fetch every 30 seconds
    const interval = setInterval(fetchBlogs, 30000);
    return () => clearInterval(interval);
  }, [endpoint]);

  return (
    <section className="latest-blogs-section fadeUp">
      <h2 className={page === "details" ? "explore_head" : "skills_heading"}>
        {page === "details" ? "Explore more Blogs" : "Latest Blog"}
      </h2>
      <hr />
      {loading && (
        <div className="load-content">
          <div className="text">Refreshing blogs...</div>
        </div>
      )}

      <div className="latest-cards-wrapper">
        {blogs.length > 0 ? (
          blogs.map((b) => (
            <div key={b._id || b.id} className="latest-blog-card">
              {b.image && <img src={b.image} alt={b.title} />}
              <h3>{b.title}</h3>
              <p>{(b.description || b.excerpt || "").slice(0, 100)}...</p>
              <Link href={`/blog/${b._id || b.id}`}>Read More</Link>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}

        <Link className="view_all_blog" href="/blog">
          View all
        </Link>
      </div>
    </section>
  );
}
