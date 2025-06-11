import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import PricingBanner from "./PricingBanner"; // adjust path if needed
import Testimonials from "../components/Testimonials"; // adjust path if needed
import "./SingleLocation.css";

const SingleLocation = ({ office }) => {
  // Determine if the screen width is 769px or wider.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Convert servicesData into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Use desktop image if available and on desktop; else fallback to hero image.
  const locationImage =
    isDesktop && office.desktopImage ? office.desktopImage : office.heroImage;
  const slug = office?.slug || office?.name.toLowerCase().replace(/\s+/g, "-"); // fallback if needed
  const canonicalUrl = `https://purehealthdx.com/locations/${slug}/`;

  // Build service snippets from servicesArray
  const servicesSnippets = servicesArray.map((service) => {
    const serviceImage = isDesktop ? service.images.desktopHero : service.images.hero;
    return {
      "@type": "Service",
      name: service.title,
      description: service.shortDescription,
      url: `https://purehealthdx.com/services/${service.id}/`,
      image: serviceImage,
      provider: {
        "@type": "Organization",
        name: "Pure Health & Wellness",
        url: "https://purehealthdx.com",
        logo: "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp"
      }
    };
  });

  // Build the office snippet (LocalBusiness) and attach all services
  const officeSnippet = {
    "@type": "Organization",
    name: office.name,
    description: office.description,
    url: window.location.href,
    image: locationImage,
    email: office.email,
    telephone: office.phone,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Health Services",
      itemListElement: servicesSnippets.map(service => ({
        "@type": "Offer",
        itemOffered: service
      }))
    }
  };


  // Wrap it in @graph
  const richSnippet = {
    "@context": "https://schema.org",
    "@graph": [
      officeSnippet
    ]
  };

  return (
    <>
      <Helmet>
        <title>{office.name} | Pure Health & Wellness</title>
        <meta name="description" content={office.description} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(richSnippet, null, 2)}
        </script>
      </Helmet>
      <div className="sl-location-card">
        {/* Office Card Row */}
        <div className="sl-location-cardrow">
          <div
            className="sl-location-image"
            style={{ backgroundImage: `url(${locationImage})` }}
          >
            <h2 className="sl-location-name">{office.name}</h2>
          </div>
<div className="sl-location-info">
  {office.address ? (
    <p
      className="sl-location-address"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${office.address.replace(/ /g, "+")}`,
          "_blank"
        )
      }
      style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
    >
      <img
        src="https://i.postimg.cc/HLxtkzZm/map-pin-1-1.webp"
        alt="Map pin"
        className="map-icon"
        width="16"
        height="16"
      />
      {office.address}
    </p>
  ) : (
    <p className="sl-location-address">Address coming soon</p>
  )}
</div>

        </div>

        {/* Redesigned Contact Info Section */}
        <div className="sl-contact-info">
          <ul className="sl-contact-list">
            {office.phone && (
              <li className="sl-contact-item">
                <strong>Phone:&nbsp;</strong>
                <a href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}>
                  {office.phone}
                </a>
              </li>
            )}
            {office.fax && (
              <li className="sl-contact-item">
                <strong>Fax:&nbsp;</strong> {office.fax}
              </li>
            )}
            {office.email && (
              <li className="sl-contact-item">
                <a href={`mailto:${office.email}`}>Email us</a>
              </li>
            )}
          </ul>
        </div>

        {/* Office Description */}
        <div className="sl-office-description">
          <h3>About {office.name}</h3>
          <p>{office.description}</p>
        </div>

        <PricingBanner />
        <Testimonials />

        {/* Services List Section */}
        <div
          className="sl-services-section"
          style={{
            backgroundImage: `url(${locationImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="sl-services-overlay">
            <h2 className="sl-services-title">Our Services</h2>
            <div className="sl-services-grid">
              {servicesArray
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="sl-service-card"
                  >
                    <div
                      className="sl-service-image"
                      style={{ backgroundImage: `url(${service.images.hero})` }}
                    ></div>
                    <div className="sl-service-info">
                      <h3 className="sl-service-name">{service.title}</h3>
                      <p className="sl-service-short">{service.shortDescription}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLocation;
