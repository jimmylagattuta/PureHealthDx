import React, { useEffect, useRef } from 'react';
import './ServiceList.css';

const services = [
  { name: 'Cart Sales', image: 'https://i.imgur.com/ZifuC4m.webp', link: "/sales" },
  { name: 'Cart Rentals', image: 'https://i.imgur.com/Nq4e2IE.webp', link: "/rentals" },
  { name: 'Installs', image: 'https://i.imgur.com/E9JX8mU.webp', link: "/services" },
  { name: 'Lithium', image: 'https://i.imgur.com/3dPB1DX.webp', link: "/services" },
  { name: 'Parts', image: 'https://i.imgur.com/Bu0AY4h.webp', link: "/parts" },
  { name: 'Pressure Wash', image: 'https://i.imgur.com/fwKirq6.webp', link: "/services" },
  { name: 'Custom Weld', image: 'https://i.imgur.com/opzf9qa.webp', link: "/services" },
  { name: 'Electronics', image: 'https://i.imgur.com/6ujl0oA.webp', link: "/services" }
];

function ServiceList() {
  const serviceRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-up'); // Add 'fade-up' class when item is in view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="service-list-section">
      <h1 className="service-list-title">Explore Our Services</h1>
      <i className="fab fa-opencart title-symbol"></i>

      <div className="service-list-grid">
        {services.map((service, index) => (
          <a href={service.link} className="service-item" key={index}>
            <div ref={(el) => (serviceRefs.current[index] = el)}>
              <img src={service.image} alt={service.name} className="service-image" />
              <h3 className="service-name">{service.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ServiceList;
