import React, { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const widgetRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scriptLoaded) {
          const script = document.createElement("script");
          script.src = "https://cdn.trustindex.io/loader.js?db37cd1481f80980a2269889243";
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
          setScriptLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 300px 0px" }
    );

    if (widgetRef.current) {
      observer.observe(widgetRef.current);
    }

    return () => observer.disconnect();
  }, [scriptLoaded]);

  return (
    <section className="testimonials-section mobile-first">
      <div className="testimonial-header">
        <div className="line" />
        <h1 className="mini-title">TESTIMONIALS</h1>
        <div className="line" />
      </div>

      <h1 className="main-title">Hear From Some of Our Satisfied Patients</h1>

      <div
        className="trustindex-widget"
        ref={widgetRef}
        style={{ marginTop: "60px", width: "100%" }}
      >
        <div className="ti-widget"></div>
      </div>
    </section>
  );
}