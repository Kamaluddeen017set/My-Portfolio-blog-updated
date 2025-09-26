"use client";

import { useParams } from "next/navigation";
import EditBlog from "../../../../components/EditBlog";

export default function EditBlogDetailPage() {
  const { id } = useParams();
  return <EditBlog blogId={id} />;
}
