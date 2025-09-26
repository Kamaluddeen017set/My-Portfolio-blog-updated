"use client";
import BlogForm from "./BlogForm";
import { useAlert } from "./AlertContext";
import { useRouter } from "next/navigation";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function CreateBlog() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const handleCreate = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), //  data already has title, content, etc.
      });

      const result = await res.json();

      if (res.ok) {
        showAlert("Blog created successfully!✔️");
        router.puch("/admin");
      } else {
        showAlert(result.message || "Error creating blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Something went wrong while creating the blog.");
    }
  };

  return <BlogForm onSubmit={handleCreate} />;
}

export default CreateBlog;
