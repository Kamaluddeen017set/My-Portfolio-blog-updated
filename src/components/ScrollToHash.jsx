"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToHash() {
  const { pathname, hash } = usePathname();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
