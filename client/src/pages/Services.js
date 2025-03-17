import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData, locationsData } from "../data";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./Services.css";

const Services = () => {
  const { serviceId } = useParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 569);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 569);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="service-page">
        <p className="small-heading">Captain Alvarado's Handyman</p>
        <h1>Service Not Found</h1>
        <p>We couldn’t find the service you’re looking for.</p>
        <Link to="/services">Go back to all services</Link>
      </div>
    );
  }

  // Determine hero images
  const heroImage = isDesktop && service.images.desktopHero
    ? service.images.desktopHero
    : service.images.hero;

  const whyChooseBg = isDesktop && service.desktopWhyChooseBg
    ? service.desktopWhyChooseBg
    : service.whyChooseBg;

  // Schema.org snippet
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "url": `https://captainalvaradohandyman.com/services/${serviceId}`,
    "image": service.images.desktopHero || service.images.hero,
    "areaServed": [
      "San Luis Obispo",
      "Paso Robles",
      "Atascadero",
      "Grover Beach",
      "Nacimiento Lake",
      "Arroyo Grande",
      "Morro Bay",
      "Los Osos",
      "Pismo Beach",
      "Cayucos"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Captain Alvarado's Handyman",
      "url": "https://captainalvaradohandyman.com",
      "logo": "https://i.imgur.com/YCrJK72j.webp"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://captainalvaradohandyman.com/services/${serviceId}`
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      <div className="service-page">
        {/* HERO SECTION */}
        <div
          className="service-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="services-hero-overlay">
            <div className="services-hero-content-title">
              <div className="line"></div>
              <h1 className="company-name-services">Captain Alvarado's Handyman</h1>
              <div className="line"></div>
            </div>

            <div className="black-background">
              <h1 className="hero-title">{service.title}</h1>
              <p className="hero-description">{service.shortDescription}</p>
            </div>
            
            <Link to="/locations#contactForm" className="cta-button">
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="service-content">
          <div className="content-section">
            <img
              src={isDesktop ? "https://i.postimg.cc/wTH3RwQL/i-Stock-944550986-2.webp" : service.images.section}
              alt={service.title}
              className="content-image"
            />

            <div className="service-content-with-title">
              <h1 id="services-title-small">{service.title}</h1>
              <div className="content-text">
                {service.mainContent.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="info-section" style={{ backgroundImage: `url(${whyChooseBg})` }}>
          <div className="info-overlay">
            <h2 className="info-title">{service.whyChooseTitle}</h2>
            <p className="info-text">{service.whyChooseContent}</p>

            <h3 className="info-subtitle">{service.helpTitle}</h3>
            <ul className="info-list">
              {service.helpList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <Link to="/about-us">
              <h3 className="info-subtitle">{service.providerTitle}</h3>
            </Link>
            <div className="provider-container">
              <div className="provider-text">
                <p className="info-text">{service.providerContent}</p>
              </div>
            </div>
            <Link to="/locations#contactForm" className="cta-button" style={{ margin: "20px" }}>
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <Contact />

      {/* LOCATIONS LIST */}
      <div className="locations-list-container">
        <h2 className="locations-list-title">Available at these Locations</h2>
        <div className="locations-grid">
          {Object.entries(locationsData).map(([key, loc]) => (
            <Link to={`/locations/${key}`} className="location-card" key={key}>
              <div className="location-image" style={{ backgroundImage: `url(${loc.desktopImage || loc.heroImage})` }}></div>
              <div className="location-content">
                <h3>{loc.name}</h3>
                {loc.address !== "Service Area" && <p>{loc.address}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <FooterComponent />
    </>
  );
};

export default Services;
