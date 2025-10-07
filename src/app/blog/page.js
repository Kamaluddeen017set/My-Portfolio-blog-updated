// app/blog/page.js
import BlogLayout from "../../components/BlogLayout";
import BlogListSsr from "../../components/BlogListSsr"; // a new small component
import "../../styles/Blog.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page() {
  let blogs = [];

  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, { cache: "no-store" });
    blogs = await res.json();
  } catch (error) {
    console.error("Error fetching blogs (SSR):", error);
  }

  return <BlogLayout blogContent={<BlogListSsr blogs={blogs} />} />;
}
