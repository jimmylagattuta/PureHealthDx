import React, { useState, useEffect, useRef } from "react";
import "./PlaquesComponent.css";

function PlaquesComponent() {
  const plaques = [
    {
      title: "Why Choose Us",
      description:
        "At Captain Alvarado's Handyman, we prioritize quality craftsmanship, reliability, and affordability. With years of experience, we ensure that every project is completed with precision and care, giving you peace of mind.",
      icon: "https://i.postimg.cc/d0TXq3Ff/i-Stock-2151690936-1.webp",
    },
    {
      title: "How We Can Help You",
      description:
        "From minor home repairs to plumbing, painting, and moving assistance, our team provides a wide range of handyman services tailored to meet your needs. We take pride in delivering professional and efficient solutions for homeowners.",
      icon: "https://i.postimg.cc/NMWrYD13/i-Stock-2151690936-2.webp",
    },
    {
      title: "See the Difference",
      description:
        "We stand out by offering meticulous attention to detail, timely service, and customer satisfaction as our top priorities. Discover the Captain Alvarado’s Handyman difference with our expert solutions designed for your home.",
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
