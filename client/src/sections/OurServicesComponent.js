import React from "react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data";
import "./OurServicesComponent.css";

function OurServicesComponent({ showViewAllButton = true }) {
  const navigate = useNavigate();

  // Convert servicesData object into an array, adding a link for each service
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    key,
    ...service,
    link: `/services/${key}`,
  }));

  return (
    <section className="our-services-section">
      <div className="services-header">
        <div className="hero-content-title">
          <div style={{ backgroundColor: "#5a7c78" }} className="line"></div>
          <h1 className="services-subtitle">OUR SERVICES</h1>
          <div style={{ backgroundColor: "#5a7c78" }} className="line"></div>
        </div>
        <h1 className="services-title">
          Hormone Replacement Therapy That Works
        </h1>
      </div>

      <div className="services-grid">
        {servicesArray.map((service) => (
          <div
            key={service.key}
            className="service-card"
            onClick={() => navigate(service.link)}
          >
            {/* Front Content (Desktop: shows image, title, and "Learn More") */}
            <div className="service-card-content">
              <img
                loading="lazy"
                src={service.images.hero}
                alt={service.title}
                className="service-img"
              />
              <h2 className="service-name">{service.title}</h2>
              <p className="service-learn-more">
                Learn More About {service.titleAbr || service.title}
              </p>
            </div>

            {/* Overlay Content with duplicate image, title, description, and button */}
            <div className="service-card-hover">
              <div className="service-mobile-image">
                <img
                  src={service.images.hero}
                  alt={service.title}
                  className="service-img"
                />
              </div>
              <h2 className="service-name-mobile">{service.title}</h2>
              <p className="service-description">{service.shortDescription}</p>
              <p className="service-learn-more">
                Learn More About {service.titleAbr || service.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {showViewAllButton && (
        <div className="all-services-btn-wrapper">
          <button
            className="all-services-btn"
            onClick={() => navigate("/services")}
          >
            View All Services
          </button>
        </div>
      )}
    </section>
  );
}

export default OurServicesComponent;
