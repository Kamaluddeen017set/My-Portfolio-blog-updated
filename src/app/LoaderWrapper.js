// app/LoaderWrapper.js
"use client";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading until page fully loads
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 800); // optional fade delay
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => window.removeEventListener("load", handleComplete);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-color, #000)",
        }}
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
