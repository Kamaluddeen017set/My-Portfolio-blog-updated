// app/blog/page.js
import BlogLayout from "../../components/BlogLayout";
import BlogCard from "../../components/BlogCard";
import "../../styles/Blog.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page() {
  let blogs = [];

  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      cache: "no-store",
    });
    blogs = await res.json();
  } catch (error) {
    console.error("Error fetching blogs (SSR):", error);
  }

  return (
    <BlogLayout
      blogContent={
        <div>
          <h1 id="blog" className="skills_heading">
            My Developer Journey: Tips, Tutorials, and Insights
          </h1>
          <h1 className="p-blog skills_heading">
            Sharing experiences, tutorials, and stories about web development
            and tech.
          </h1>

          <div className="blog-container">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
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
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      }
    />
  );
}
