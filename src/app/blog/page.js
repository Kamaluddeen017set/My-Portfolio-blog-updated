// app/blog/page.js
import BlogLayout from "../../components/BlogLayout";
import Blog from "../../components/Blog";

export default function Page() {
  return <BlogLayout blogContent={<Blog />} />;
}
