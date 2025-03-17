import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurServicesComponent.css";

function OurServicesComponent() {
  const navigate = useNavigate();

  const services = [
    {
      title: "On-Page SEO",
      description: "Optimize your website content and meta tags for improved search engine rankings.",
      link: "/services/on-page-seo",
      image: "https://example.com/on-page-seo-hero.webp"
    },
    {
      title: "Technical SEO",
      description: "Improve site speed, mobile responsiveness, and overall performance.",
      link: "/services/technical-seo",
      image: "https://example.com/technical-seo-hero.webp"
    },
    {
      title: "Website Development",
      description: "Build responsive, SEO-friendly websites that represent your brand.",
      link: "/services/web-development",
      image: "https://example.com/web-development-hero.webp"
    },
    {
      title: "Mobile App Development",
      description: "Create intuitive mobile applications for iOS and Android platforms.",
      link: "/services/mobile-app",
      image: "https://example.com/mobile-app-hero.webp"
    },
    {
      title: "Apple Watch App Development",
      description: "Extend your ecosystem with sleek, functional apps for Apple Watch.",
      link: "/services/watch-app",
      image: "https://example.com/watch-app-hero.webp"
    }
  ];

  return (
    <section className="our-services-section">
      {/* Header and Slogan */}
      <div className="hero-content-title">
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
        <h1 style={{ color: "black" }} className="company-name">OUR SERVICES</h1>
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
      </div>

      <p className="our-services-slogan">Quality Work, Honest Service, Affordable Prices.</p>

      {/* Service Cards */}
      <div className="services-cards-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => navigate(service.link)}
          >
            {/* FRONT (Desktop Default) */}
            <div className="service-front">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <h2 className="service-title">{service.title}</h2>
              <p className="service-link">Learn More About {service.title}</p>
            </div>

            {/* BACK (Desktop Hover, Mobile Default) */}
            <div className="service-back">
              <img
                src={service.image}
                alt={service.title}
                className="service-image-back"
              />
              <p className="service-description">{service.description}</p>
              <p className="service-link">Learn More About {service.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurServicesComponent;
