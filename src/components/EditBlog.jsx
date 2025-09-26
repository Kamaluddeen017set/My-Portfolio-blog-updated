"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAlert } from "./AlertContext";
import BlogForm from "./BlogForm";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function EditBlog() {
  const { showAlert } = useAlert();
  const { id } = useParams();

  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
        const data = await res.json();
        setInitialData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (updatedBlog) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBlog),
    });

    const result = await res.json();
    if (res.ok) {
      showAlert("Blog updated successfully✔️");
      router.push("/admin/edit");
    } else {
      showAlert(result.message || "Failed to update blog");
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return <BlogForm onSubmit={handleUpdate} initialData={initialData} />;
}

export default EditBlog;
