// components/BlogList.jsx
"use client";
import { useState } from "react";
import BlogCard from "./BlogCard";

export default function BlogListSsr({ blogs }) {
  const [query, setQuery] = useState("");

  const filtered = blogs.filter((blog) =>
    [blog.title, blog.excerpt, blog.category]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <form className="search-container" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search blog..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="blog-container">
        {filtered.length > 0 ? (
          filtered.map((blog) => (
            <BlogCard
              key={blog._id}
              image={blog.image}
              category={<span className="category-badge">{blog.category}</span>}
              tags={blog.tags?.map((tag, idx) => (
                <span key={idx} className="tag-badge">
                  {tag}
                </span>
              ))}
              date={new Date(blog.date).toLocaleDateString()}
              title={blog.title}
              excerpt={blog.excerpt}
              link={`/blog/${blog._id}`}
            />
          ))
        ) : (
          <p>No blogs found...</p>
        )}
      </div>
    </div>
  );
}
