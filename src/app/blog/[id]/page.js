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
        description:
          blog.excerpt || blog.content.replace(/<[^>]*>?/gm, "").slice(0, 150),
        images: [
          {
            url:
              blog.image ||
              `${process.env.NEXT_PUBLIC_FRONT_END_URL}/default-og.png`,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/blog/${blog._id}`,
        type: "article",
        siteName: "Devkhamal Portfolio And Blog",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description:
          blog.excerpt || blog.content.replace(/<[^>]*>?/gm, "").slice(0, 150),
        images: [
          blog.image ||
            `${process.env.NEXT_PUBLIC_FRONT_END_URL}/default-og.png`,
        ],
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
  const { id } = await params;

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
