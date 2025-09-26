"use client";
import "../styles/AdminPanel.css";
import { useRouter } from "next/navigation";

function AdminPanel() {
  const router = useRouter();
  return (
    <div className="admin-container">
      <h1>Welcome Back</h1>
      <h1>
        DEV <span className="logo">KHAMAL</span>
      </h1>
      <hr />
      <h1 className="skills_heading">Admin Panel</h1>
      <button onClick={() => router.push("/admin/create")}>Add New Blog</button>
      <button onClick={() => router.push("/admin/edit")}>Edit Blog</button>
      <button onClick={() => router.push("/admin/delete")}>Delete Blog</button>
    </div>
  );
}

export default AdminPanel;
