"use client";

import { useState, useRef } from "react";
import Navbar from "../../../components/Navbar";
import Slider from "../../../components/Slider";
import ThemeToggle from "../../../components/ThemeToggle";
import BlogDetail from "../../../components/BlogDetail";

export default function BlogDetailClient({ blog }) {
  const [openNav, setOpenNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuButtonRef = useRef(null);

  return (
    <>
      <Navbar
        menuButtonRef={menuButtonRef}
        handleNavSetion={setOpenNav}
        handleNav={openNav}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Slider
        menuButtonRef={menuButtonRef}
        handleNavSetion={setOpenNav}
        handleNav={openNav}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <ThemeToggle />
      <BlogDetail blog={blog} />
    </>
  );
}
