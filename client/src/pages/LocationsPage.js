import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { locationsData } from "../data";
import LocationsSection from "../sections/LocationsSection";
import SingleLocation from "../sections/SingleLocation";
import PricingBanner from "../sections/PricingBanner";
import Testimonials from "../components/Testimonials";
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

export default function LocationsPage() {
  const { locationId } = useParams();
  const isSingle = Boolean(locationId);
  const canonicalUrl = isSingle
    ? `https://purehealthdx.com/locations/${locationId}/`
    : `https://purehealthdx.com/locations/`;

  // Build JSON-LD for listing page
  const clinicsItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: Object.keys(locationsData).map((slug, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://purehealthdx.com/locations/${slug}/`,
    })),
  };

  const locationsBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://purehealthdx.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: canonicalUrl,
      },
    ],
  };

  // Decide what content to render
  let content;
  if (isSingle) {
    const office = locationsData[locationId];
    content = office
      ? <SingleLocation office={office} slug={locationId} />
      : (
        <div className="office-detail not-found">
          <h2>Office Not Found</h2>
          <p>Please select a valid location.</p>
        </div>
      );
  } else {
    content = (
      <>
        <LocationsSection showButton={false} />
        {/* contact form omitted for brevity */}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <title>
          {isSingle
            ? `${locationsData[locationId]?.name || "Clinic Not Found"} | Pure Health & Wellness`
            : "Our California Clinics | Pure Health & Wellness"}
        </title>
        <meta
          name="description"
          content={
            isSingle
              ? locationsData[locationId]?.description || "Visit our local Pure Health & Wellness clinic."
              : "Explore Pure Health & Wellness clinics across California. We offer hormone therapy, weight loss programs, pain management, and more."
          }
        />

        {/* Listing page JSON-LD */}
        {!isSingle && (
          <>
            <script type="application/ld+json">
              {JSON.stringify(clinicsItemList, null, 2)}
            </script>
            <script type="application/ld+json">
              {JSON.stringify(locationsBreadcrumb, null, 2)}
            </script>
          </>
        )}

        {/* Single-location breadcrumb (SingleLocation handles its own clinic JSON-LD) */}
        {isSingle && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `${canonicalUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://purehealthdx.com/" },
                { "@type": "ListItem", position: 2, name: "Locations", item: "https://purehealthdx.com/locations/" },
                { "@type": "ListItem", position: 3, name: locationsData[locationId]?.name || "Clinic", item: canonicalUrl }
              ]
            }, null, 2)}
          </script>
        )}
      </Helmet>

      <div className="locations-page-container">
        <div className="contact-header">
          <p className="small-heading">PURE HEALTH &amp; WELLNESS</p>
          <h2 className="main-heading">Our California Clinics</h2>
          <p className="sub-text">
            Find expert hormone therapy, peptide treatments, ED care, weight loss programs, and advanced pain management at any of our locations.
          </p>
        </div>
        {content}
      </div>

      <PricingBanner />
      <Testimonials />
      <FooterComponent />
    </>
  );
}
