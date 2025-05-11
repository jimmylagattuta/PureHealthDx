import React, { useState, useEffect, useRef } from "react";
import "./PlaquesComponent.css";

function PlaquesComponent() {
  const plaques = [
    {
      title: "Unmatched Customer Service",
      icon: "https://i.postimg.cc/wBkLvY2D/how-it-works-icon.webp",  
    },
    {
      title: "Supervised by Licensed Medical Doctors",
      icon: "https://i.postimg.cc/DfRgRFMz/licensed-in-10-states.webp",
    },
    {
      title: "20+ Years of Experience",
      icon: "https://i.postimg.cc/XYSCkYDw/experience.webp",
    },
  ];

  const [visible, setVisible] = useState({});
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = e.target.dataset.index;
          if (e.intersectionRatio > 0.6) {
            setVisible((v) => ({ ...v, [i]: true }));
          }
        });
      },
      { threshold: [0, 0.4, 0.6, 1] }
    );

    refs.current.forEach((r) => r && obs.observe(r));
    return () => refs.current.forEach((r) => r && obs.unobserve(r));
  }, []);

  return (
    <section className="plaques-section">
      {plaques.map((p, i) => (
        <div
          key={i}
          className={`plaque-card ${visible[i] ? "visible" : ""}`}
          ref={(el) => (refs.current[i] = el)}
          data-index={i}
        >
          <img
            src={p.icon}
            alt={p.title}
            className="plaque-icon"
            loading="lazy"
          />
          <h3 className="plaque-title">{p.title}</h3>
        </div>
      ))}
    </section>
  );
}

export default PlaquesComponent;
