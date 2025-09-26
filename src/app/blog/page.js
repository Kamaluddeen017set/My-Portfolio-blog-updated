"use client";

import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import ThemeToggle from "../../components/ThemeToggle";
import Blog from "../../components/Blog";
import Footer from "../../components/Footer";
import ScrollToHash from "../../components/ScrollToHash";
import { useState, useRef } from "react";

export default function BlogPage() {
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
      <Blog />
      <Footer />
    </>
  );
}
