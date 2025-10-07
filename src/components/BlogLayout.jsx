"use client";
import { useState, useRef } from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import ScrollToHash from "./ScrollToHash";

export default function BlogLayout({ blogContent }) {
  const [openNav, setOpenNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);

  return (
    <>
      <ScrollToHash />
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
      {blogContent}
      <Footer />
    </>
  );
}
