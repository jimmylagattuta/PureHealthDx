import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { locationsData, servicesData } from "../data";
import LocationsSection from "../sections/LocationsSection";
import SingleLocation from "../sections/SingleLocation";
import PricingBanner from "../sections/PricingBanner"; // adjust path if needed
import Testimonials from "../components/Testimonials"; // adjust path if needed
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

export default function LocationsPage() {
  const { locationId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Grab first location for default in the JSON-LD org address
  const [firstKey, firstLocation] = Object.entries(locationsData)[0] || [];
  const addressParts = firstLocation.address.split(",").map(s => s.trim());
  const street = addressParts[0] || "";
  const city = addressParts[1] || "";
  const [region, ...postal] = (addressParts[2] || "").split(" ");

  useEffect(() => {
    // Scroll into view if anchor is present
    if (window.location.hash === "#contactForm") {
      const el = document.getElementById("contactForm");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "First Name is required.";
    if (!formData.lastName) errs.lastName = "Last Name is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Invalid email format.";
    if (!formData.phone) errs.phone = "Phone is required.";
    else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone))
      errs.phone = "Invalid phone number.";
    if (!formData.message) errs.message = "Message is required.";
    if (!formData.agreement) errs.agreement = "You must agree to terms.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({ contact: formData }),
      });
      if (res.ok) setSubmitted(true);
      else setErrors({ form: "Error sending message." });
    } catch {
      setErrors({ form: "Error sending message." });
    }
  };

  const isSingle = Boolean(locationId);
  const canonicalUrl = isSingle
    ? `https://purehealthdx.com/locations/${locationId}/`
    : `https://purehealthdx.com/locations/`;

  // JSON-LD for the listing page
  let richSnippet = null;
  if (!isSingle) {
    // Organization node using first location for address
    const orgNode = {
      "@type": "Organization",
      "@id": "https://purehealthdx.com/#org",
      name: "Pure Health & Wellness",
      url: "https://purehealthdx.com",
      logo: "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-877-271-0203",
        contactType: "Customer Service",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"]
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: city,
        addressRegion: region,
        postalCode: postal.join(" "),
        addressCountry: "US"
      }
    };

    // One Service node per service
    const serviceNodes = Object.entries(servicesData).map(([slug, svc]) => ({
      "@type": "Service",
      "@id": `https://purehealthdx.com/services/${slug}/#service`,
      name: svc.title,
      description: svc.shortDescription,
      url: `https://purehealthdx.com/services/${slug}/`,
      provider: { "@id": "https://purehealthdx.com/#org" }
    }));

    // One MedicalClinic node per location
    const clinicNodes = Object.entries(locationsData).map(([slug, loc]) => {
      const parts = loc.address.split(",").map(s => s.trim());
      const street = parts[0] || "";
      const city = parts[1] || "";
      const [region, ...postal] = (parts[2] || "").split(" ");
      return {
        "@type": "MedicalClinic",
        "@id": `https://purehealthdx.com/locations/${slug}/#clinic`,
        name: loc.name,
        description: loc.description,
        image: loc.desktopImage || loc.heroImage,
        url: `https://purehealthdx.com/locations/${slug}/`,
        telephone: loc.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: city,
          addressRegion: region,
          postalCode: postal.join(" "),
          addressCountry: "US"
        },
        openingHours: loc.hours.replace(/, /g, ", "),
        parentOrganization: { "@id": "https://purehealthdx.com/#org" }
      };
    });

    richSnippet = {
      "@context": "https://schema.org",
      "@graph": [orgNode, ...serviceNodes, ...clinicNodes]
    };
  }

  // Determine which UI content to render
  let content;
  if (isSingle) {
    const office = locationsData[locationId];
    content = office ? (
      <SingleLocation office={office} slug={locationId} />
    ) : (
      <div className="office-detail not-found">
        <h2>Office Not Found</h2>
        <p>Please select a valid location.</p>
      </div>
    );
  } else {
    content = (
      <>
        <LocationsSection showButton={false} />
      </>
    );
  }

  return (
    <div>
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
              ? locationsData[locationId]?.description ||
                "Visit our local Pure Health & Wellness clinic."
              : "Explore Pure Health & Wellness clinics across California. We offer hormone therapy, weight loss programs, pain management, and more."
          }
        />

        <meta
          property="og:title"
          content={
            isSingle
              ? `${locationsData[locationId]?.name || "Clinic Not Found"} | Pure Health & Wellness`
              : "Our California Clinics | Pure Health & Wellness"
          }
        />
        <meta
          property="og:description"
          content={
            isSingle
              ? locationsData[locationId]?.description ||
                "Visit our local Pure Health & Wellness clinic."
              : "Explore Pure Health & Wellness clinics across California. We offer hormone therapy, weight loss programs, pain management, and more."
          }
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp"
        />
        <meta property="og:url" content={canonicalUrl} />

        {!isSingle && (
          <>
            <script key="rich-snippet" type="application/ld+json">
              {JSON.stringify(richSnippet, null, 2)}
            </script>
            <script key="webpage-snippet" type="application/ld+json">
              {JSON.stringify(
                {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "@id": canonicalUrl,
                  url: canonicalUrl,
                  name: "Our California Clinics | Pure Health & Wellness",
                  description:
                    "Explore Pure Health & Wellness clinics across California. We offer hormone therapy, weight loss programs, pain management, and more.",
                  breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` }
                },
                null,
                2
              )}
            </script>
            <script key="breadcrumb-snippet" type="application/ld+json">
              {JSON.stringify(
                {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "@id": `${canonicalUrl}#breadcrumb`,
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://purehealthdx.com/"
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Locations",
                      item: "https://purehealthdx.com/locations/"
                    }
                  ]
                },
                null,
                2
              )}
            </script>
          </>
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
    </div>
  );
}
