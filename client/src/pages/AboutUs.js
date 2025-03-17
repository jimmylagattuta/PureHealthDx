import React from "react";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./AboutUs.css";

const AboutUs = () => {
  // Convert servicesData object into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Build the rich snippet JSON‑LD object for the About Us page.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Captain Alvarado's Handyman",
    "url": "https://captainalvaradohandyman.com/about-us",
    "logo": "https://i.imgur.com/YCrJK72j.webp",
    "description":
      "Captain Alvarado's Handyman provides expert home repair, plumbing, painting, moving assistance, and clean-out services throughout San Luis Obispo County. Reliable, affordable, and professional solutions for your home and business needs.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "805-635-1774",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    },
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Handyman Services",
      "itemListElement": servicesArray.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.shortDescription,
          "url": `https://captainalvaradohandyman.com/services/${service.id}`
        }
      }))
    }
  };

  return (
    <div className="aboutus-container">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero-overlay">
          <h1 className="aboutus-hero-title">Welcome to Captain Alvarado's Handyman!</h1>
          <p className="aboutus-hero-subtitle">
            Reliable, Professional, and Affordable Handyman Services
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="aboutus-section">
        <h2 className="aboutus-heading">About Us</h2>
        <div className="aboutus-content">
          <div className="aboutus-card">
            <h3>Why Choose Us</h3>
            <p>
              With extensive experience in home repairs and maintenance, Captain Alvarado's Handyman is committed to delivering high-quality services with professionalism and care. We understand the importance of keeping your home in top shape, and we’re here to help.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>How We Can Help You</h3>
            <p>
              Whether you need minor plumbing repairs, a fresh coat of paint, moving assistance, or a complete home clean-out, our skilled team is ready to tackle your home improvement projects. We offer reliable and affordable solutions tailored to your needs.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>See the Difference</h3>
            <p>
              Our attention to detail and dedication to customer satisfaction sets us apart. Every repair, installation, and project we handle is done with precision and care, ensuring lasting results.
            </p>
          </div>
        </div>
      </section>

      {/* Services for SEO */}
      <section className="aboutus-services">
        <h2 className="aboutus-services-title">Our Services</h2>
        <div className="aboutus-services-grid">
          {servicesArray.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.id}`}
              className="aboutus-service-card"
            >
              <div
                className="aboutus-service-image"
                style={{ backgroundImage: `url(${service.images.hero})` }}
              ></div>
              <h3 className="aboutus-service-title">{service.title}</h3>
              <p className="aboutus-service-desc">{service.shortDescription}</p>
            </a>
          ))}
        </div>
      </section>
      <Contact />
      <FooterComponent />
    </div>
  );
};

export default AboutUs;
