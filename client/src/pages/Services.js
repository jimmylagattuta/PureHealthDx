import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import PricingBanner from "./PricingBanner"; 
import Testimonials from "../components/Testimonials"; 
import "./SingleLocation.css";

export default function SingleLocation({ office, slug }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const safeSlug = slug || office?.name.toLowerCase().replace(/\s+/g, "-");
  const canonicalUrl = `https://purehealthdx.com/locations/${safeSlug}/`;

  const addressParts = office.address?.split(",").map(part => part.trim()) || [];
  const street = addressParts[0] || "";
  const city = addressParts[1] || "";
  const [region, ...postal] = (addressParts[2] || "").split(" ");
  const postalCode = postal.join(" ");

  const locationImage =
    isDesktop && office.desktopImage ? office.desktopImage : office.heroImage;

  // Build a lightweight OfferCatalog referencing each service by ID
  const clinicSnippet = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${canonicalUrl}#clinic`,
    name: office.name,
    description: office.description,
    image: locationImage,
    url: canonicalUrl,
    telephone: office.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode: postalCode,
      addressCountry: "US"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Offered",
      itemListElement: Object.keys(servicesData).map((svcId) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `https://purehealthdx.com/services/${svcId}/#service`
        }
      }))
    },
    parentOrganization: { "@id": "https://purehealthdx.com/#org" }
  };

  const clinicBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://purehealthdx.com/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://purehealthdx.com/locations/" },
      { "@type": "ListItem", position: 3, name: office.name, item: canonicalUrl }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{office.name} | Pure Health & Wellness</title>
        <meta name="description" content={office.description} />
        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify(clinicSnippet, null, 2)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(clinicBreadcrumb, null, 2)}
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
                <a href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}>{office.phone}</a>
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
              {Object.entries(servicesData)
                .map(([key, service]) => ({ ...service, id: key }))
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
                    />
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
}
