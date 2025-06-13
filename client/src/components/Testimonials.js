import React, { useEffect } from "react";
import "./Testimonials.css";

export default function Testimonials() {
  useEffect(() => {
    // 1) Remove any previously injected loader
    document
      .querySelectorAll('script[src*="trustindex.io/loader.js"]')
      .forEach(s => s.parentNode.removeChild(s));

    // 2) Inject a brand-new loader (cache-busted so it runs again)
    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?db37cd1481f80980a2269889243&t=${Date.now()}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // (no clean-up needed on unmount,
    //  we want the widget to persist once loaded)
  }, []); // run once, after placeholder mounts

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

      {/* This placeholder must exist *before* the loader runs */}
      <div
        className="ti-widget"
        data-id="db37cd1481f80980a2269889243"
        style={{ width: "100%", marginTop: "60px", minHeight: "200px" }}
      ></div>
    </section>
  );
}
