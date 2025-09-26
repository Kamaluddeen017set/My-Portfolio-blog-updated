"use client";

import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Hero from "../components/Hero";
import SocialIcons from "../components/SocialIcons";
import Skills from "../components/Skills";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";
import About from "../components/About";
import Project from "../components/Project";
import Testimonials from "../components/testimonial";
import Contact from "../components/Contact";
import LatestBlogs from "../components/LatestBlogs";
import ScrollToHash from "../components/ScrollToHash";

export default function HomePage() {
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
      <ThemeToggle />
      <Slider
        menuButtonRef={menuButtonRef}
        handleNavSetion={setOpenNav}
        handleNav={openNav}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero />
      <SocialIcons />
      <About />
      <Skills />
      <Project />
      <Testimonials />
      <LatestBlogs page="home" />

      <Contact />
      <Footer />
    </>
  );
}
