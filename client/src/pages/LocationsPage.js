import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { serviceOfferedData } from "../data";
import LocationsSection from "../sections/LocationsSection"; // Office list component
import SingleLocation from "../sections/SingleLocation";
import Contact from "./main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

function LocationsPage() {
  const { locationId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const isSingleLocation = Boolean(locationId);

  // For rich snippet on the list page, since serviceOfferedData no longer includes an address,
  // we'll generate a simpler rich snippet using the available fields.
  let locationsRichSnippet = null;
  if (!isSingleLocation) {
    const locationsArray = Object.entries(serviceOfferedData).map(([key, loc]) => ({
      "@type": "LocalBusiness",
      "name": loc.name,
      "telephone": loc.phone,
      "url": `https://lightningseo.dev/locations/${key}`,
      "image": loc.desktopImage || loc.heroImage,
      "description": loc.description,
      // Since there’s no physical address, we omit the address property.
    }));
    locationsRichSnippet = {
      "@context": "https://schema.org",
      "@graph": locationsArray
    };
  }

  // Determine content: single location or list
  let officeContent = null;
  if (locationId) {
    const office = serviceOfferedData[locationId];
    if (office) {
      officeContent = <SingleLocation office={office} />;
    } else {
      officeContent = (
        <div className="office-detail not-found">
          <h2>Location Not Found</h2>
          <p>Please select a valid location.</p>
        </div>
      );
    }
  } else {
    // Use the LocationsSection component (ensure it's updated to use serviceOfferedData)
    officeContent = <LocationsSection showButton={false} />;
  }

  // Optional: scroll to contact form if URL hash is set.
  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      const element = document.getElementById("contactForm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      {/* Inject the rich snippet for all locations when not on an individual location page */}
      {!isSingleLocation && locationsRichSnippet && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(locationsRichSnippet)}
          </script>
        </Helmet>
      )}
      <div className="locations-page-container">
        <div className="contact-header">
          <p className="small-heading">LightningSEO.dev</p>
          <h2 className="main-heading">Find a Service Area Near You</h2>
          <p className="sub-text">
            We proudly serve customers across key markets. Whether you're in Long Beach, CA or Griffin, GA, our service areas are here to help you achieve top-notch SEO results.
          </p>
        </div>
        {officeContent}
      </div>
      {/* Contact form wrapped with an id so the page can scroll to it */}
      <div id="contactForm">
        <Contact />
      </div>
      <FooterComponent />
    </div>
  );
}

export default LocationsPage;
