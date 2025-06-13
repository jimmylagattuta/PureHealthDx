// src/components/Testimonials.jsx
import React, { useEffect, useRef } from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // wipe out any old markup
    widgetRef.current.innerHTML = "";

    // inject the Trustindex loader _inside_ our placeholder
    const s = document.createElement("script");
    s.src = "https://cdn.trustindex.io/loader.js?db37cd1481f80980a2269889243";
    s.async = true;
    s.defer = true;
    widgetRef.current.appendChild(s);
  }, []);

  return (
    <section className="testimonials-section mobile-first">
      <div className="testimonial-header">
        <div className="line" />
        <h1 className="mini-title">TESTIMONIALS</h1>
        <div className="line" />
      </div>

      <h1 className="main-title">
        Hear From Some of Our Satisfied Patients
      </h1>

      {/* here’s the only thing we need now */}
      <div
        ref={widgetRef}
        style={{ width: "100%", marginTop: "60px", minHeight: "200px" }}
      ></div>
    </section>
  );
}
