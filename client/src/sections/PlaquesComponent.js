import React, { useState, useEffect, useRef } from "react";
import "./PlaquesComponent.css";

function PlaquesComponent() {
  const plaques = [
    {
      title: "Why Choose Us",
      description:
        "At Lightning SEO, we prioritize innovative strategies, data-driven insights, and measurable results. With years of industry experience, we deliver digital solutions that are reliable, affordable, and designed to drive your online growth.",
      icon: "https://i.postimg.cc/d0TXq3Ff/i-Stock-2151690936-1.webp",
    },
    {
      title: "How We Can Help You",
      description:
        "From comprehensive SEO audits and technical optimizations to custom website development, mobile app creation, and Apple Watch app development, our team offers a full suite of digital services tailored to boost your online presence and drive results.",
      icon: "https://i.postimg.cc/NMWrYD13/i-Stock-2151690936-2.webp",
    },
    {
      title: "See the Difference",
      description:
        "We stand out with our commitment to innovation, meticulous attention to detail, and exceptional customer service. Experience the Lightning SEO difference that transforms your digital presence and propels sustainable growth.",
      icon: "https://i.postimg.cc/FzVcZcLw/i-Stock-2151690936-3.webp",
    },
  ];

  const [visiblePlaques, setVisiblePlaques] = useState({});
  const plaqueRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.intersectionRatio > 0.6) {
            setVisiblePlaques((prev) => ({
              ...prev,
              [index]: true,
            }));
          }
        });
      },
      { threshold: [0, 0.4, 0.6, 1] }
    );

    plaqueRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      plaqueRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="plaques-section">
      {plaques.map((plaque, index) => (
        <div
          key={index}
          className="plaque-card"
          ref={(el) => (plaqueRefs.current[index] = el)}
          data-index={index}
        >
          <img
            src={plaque.icon}
            alt={plaque.title}
            className="plaque-icon"
            loading="lazy"
          />
          <h1 className="plaque-title">{plaque.title}</h1>
          <p
            className={`plaque-description ${
              visiblePlaques[index] ? "visible" : ""
            }`}
          >
            {plaque.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default PlaquesComponent;
