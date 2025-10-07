"use client";

import React, { useState, useEffect } from "react";
import "../styles/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Ghanitat Olumegbon",
    role: "Data Analyst · UI/UX Designer · Content Creator",
    image: "/ghaniyatPic.jpg",
    quote:
      "kamaluddin You did an amazing job on my portfolio -clean, professional, and beyond my expectations. I’ll definitely recommend your work!",
    rating: 5,
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // start safe (no window access)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 835);

    // Run immediately on mount
    handleResize();

    // Attach listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section id="testimonial" className="testimonials">
      <h1 className="skills_heading">What People Say</h1>
      <hr />
      <div className="carousel">
        {!isMobile && (
          <button className="nav left  hidden" onClick={prevSlide}>
            ❮
          </button>
        )}
        {/* visible is socond option when is more then 3 👇👇 */}
        <div className="cards-wrapper fadeUp testimonial-wrapper">
          {(isMobile ? testimonials : testimonials).map((t) => (
            <div key={t.id} className="testimonial-card animate">
              <div className="profile">
                <img src={t.image} alt={t.name} />
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                  <div className="stars">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>
                </div>
              </div>
              <p className="quote">“{t.quote}”</p>
            </div>
          ))}
        </div>
        {!isMobile && (
          <button className="nav right hidden" onClick={nextSlide}>
            ❯
          </button>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
