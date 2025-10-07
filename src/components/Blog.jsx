"use client"; // 👈 Required because it uses useState and useEffect

import "../styles/Blog.css";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`, { cache: "no-store" });
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    [blog.title, blog.excerpt, blog.category]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 id="blog" className="skills_heading">
        My Developer Journey: Tips, Tutorials, and Insights
      </h1>
      <h1 className="p-blog skills_heading">
        Sharing experiences, tutorials, and stories about web development and
        tech.
      </h1>

      <SearchBar query={query} setQuery={setQuery} />

      {loading ? (
        <div className="loading-container">
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loading-text">Loading blogs...</div>
          </div>
        </div>
      ) : (
        <div className="blog-container">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                image={blog.image}
                category={
                  <span className="category-badge">
                    {blog.category || "N/A"}
                  </span>
                }
                tags={
                  blog.tags?.length
                    ? blog.tags.map((tag, idx) => (
                        <span key={idx} className="tag-badge">
                          {tag}
                        </span>
                      ))
                    : "N/A"
                }
                date={new Date(blog.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                title={blog.title}
                excerpt={blog.excerpt}
                link={`/blog/${blog._id}`}
              />
            ))
          ) : (
            <p>No blogs match your search...</p>
          )}
        </div>
      )}
    </div>
  );
}

const SearchBar = ({ query, setQuery }) => (
  <form className="search-container" onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      placeholder="Search blog..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  </form>
);

export default Blog;
