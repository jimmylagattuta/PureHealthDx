import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data"; 
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
        <p className="small-heading">LightningSEO.dev</p>
        <h1>Service Not Found</h1>
        <p>We couldn’t find the service you’re looking for.</p>
        <Link to="/services">Go back to all services</Link>
      </div>
    );
  }

  // Ensure hero and content images are different
  const heroImage = isDesktop ? service.images.desktopHero : service.images.hero;
  const contentImage = isDesktop ? service.images.desktopContent : service.images.content;
  const sectionImage = isDesktop ? service.images.desktopSection : service.images.section;
  const whyChooseBg = isDesktop && service.desktopWhyChooseBg ? service.desktopWhyChooseBg : service.whyChooseBg;

  // Schema.org snippet
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "url": `https://lightningseo.dev/services/${serviceId}`,
    "image": heroImage, // Ensuring different image for structured data
    "provider": {
      "@type": "Organization",
      "name": "LightningSEO.dev",
      "url": "https://lightningseo.dev",
      "logo": "https://i.postimg.cc/QtwR2GW9/i-Stock-1502494966-1.webp"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://lightningseo.dev/services/${serviceId}`
    }
  };
  console.log('Service', service);

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
              <h1 className="company-name-services">LightningSEO.dev</h1>
              <div className="line"></div>
            </div>

            <div className="black-background">
              <h1 className="hero-title">{service.title}</h1>
              <p className="hero-description">{service.shortDescription}</p>
            </div>
            
            <Link to="/contact#contactForm" className="cta-button">
              Get a Free SEO Audit
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <div className="service-content">
        <div className="content-section">
  <img src={contentImage} alt={service.title} className="content-image" />

  <div className="service-content-with-title">
    <h1 id="services-title-small">{service.title}</h1>
    
    <div className="content-text">
      {typeof service.mainContent === "string" ? (
        service.mainContent.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph.trim()}</p>
        ))
      ) : (
        <p>{JSON.stringify(service.mainContent)}</p> // Fallback for object-type content
      )}
    </div>
    {/* ✅ Add Website Link Here */}
    {service.url && (
      <p className="service-website">
        <strong>Website:</strong>{" "}
        <a href={service.url} target="_blank" rel="noopener noreferrer">
          {service.url}
        </a>
      </p>
    )}
  </div>
</div>

        </div>

        {/* INFO SECTION */}
        {service.whyChooseTitle && (
          <div className="info-section" style={{ backgroundImage: `url(${whyChooseBg})` }}>
            <div className="info-overlay">
              <h2 className="info-title">{service.whyChooseTitle}</h2>
              <p className="info-text">{service.whyChooseContent}</p>

              {service.helpTitle && (
                <>
                  <h3 className="info-subtitle">{service.helpTitle}</h3>
                  <ul className="info-list">
                    {service.servicesOffered && Array.isArray(service.servicesOffered) && (
                      <ul className="info-list">
                        {service.servicesOffered.map((item, i) => (
                          <li key={i}>
                            <strong>{item.name}:</strong> {item.description} 
                            <br />
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              Learn more
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </>
              )}

              {service.providerTitle && (
                <Link to="/about-us">
                  <h3 className="info-subtitle">{service.providerTitle}</h3>
                </Link>
              )}
              {service.providerContent && (
                <div className="provider-container">
                  <div className="provider-text">
                    <p className="info-text">{service.providerContent}</p>
                  </div>
                </div>
              )}
              <Link to="/contact#contactForm" className="cta-button" style={{ margin: "20px" }}>
                Get a Free SEO Audit
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CONTACT FORM */}
      <Contact />

      {/* FOOTER */}
      <FooterComponent />
    </>
  );
};

export default Services;
