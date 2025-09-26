import BlogDetailClient from "./BlogDetailClient";
import Footer from "../../../components/Footer";
import LatestBlogs from "../../../components/LatestBlogs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Blog not found",
        description: "This blog post could not be found.",
      };
    }

    const blog = await res.json();

    return {
      title: blog.title || "Blog",
      description:
        blog.excerpt ||
        (blog.content
          ? blog.content.replace(/<[^>]*>?/gm, "").slice(0, 150)
          : "Read this blog post"),
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [blog.image],
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${blog._id}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: [blog.image],
      },
    };
  } catch (err) {
    console.error("Error fetching blog in metadata:", err);
    return {
      title: "Error",
      description: "There was a problem loading this blog.",
    };
  }
}

// ✅ Page
export default async function BlogDetailPage({ params }) {
  const { id } = await params; // 👈 FIX: await params

  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <div className="p-6 text-red-500">Blog not found</div>;
    }

    const blog = await res.json();

    return (
      <>
        <BlogDetailClient blog={blog} />
        <LatestBlogs page="details" />
        <Footer />
      </>
    );
  } catch (err) {
    console.error("Error fetching blog in page:", err);
    return (
      <div className="p-6 text-red-500">
        Failed to load blog. Try again later.
      </div>
    );
  }
}
