"use client";

import { useEffect, useState } from "react";
import AdminPanel from "../../components/AdminPanel";
import Login from "../../components/Login";

export default function AdminPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (!token) {
    return <Login />;
  }

  return <AdminPanel />;
}
