// src/components/AboutUs.js
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./AboutUs.css";

const AboutUs = () => {
const richSnippet = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://purehealthdx.com/#organization",
      "name": "Pure Health & Wellness",
      "url": "https://purehealthdx.com/",
      "logo": "https://i.postimg.cc/FsjJMwWQ/footer-logo.webp",
      "image": "https://i.postimg.cc/SK6KjGDy/i-Stock-493796666.webp",
      "description": "Pure Health & Wellness provides customized care in hormone therapy, erectile dysfunction treatment, weight loss, pain management, and peptide therapy. We offer expert, compassionate based in Fresno, California.",
      "telephone": "+1-877-271-0203",
      "email": "info@purehealthdx.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-877-271-0203",
        "contactType": "Customer Service",
        "areaServed": "US",
        "availableLanguage": ["English", "Spanish"]
      },
      "sameAs": [
        "https://www.facebook.com/purehealthdx",
        "https://www.instagram.com/purehealthdx"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/testosterone-replacement-therapy/#service",
      "serviceType": "Testosterone Replacement Therapy",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/testosterone-replacement-therapy/"
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/hormone-therapy-for-women/#service",
      "serviceType": "Hormone Therapy for Women",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/hormone-therapy-for-women/"
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/erectile-dysfunction-treatment/#service",
      "serviceType": "Erectile Dysfunction Treatment",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/erectile-dysfunction-treatment/"
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/benefits-of-peptide-therapy/#service",
      "serviceType": "Peptide Therapy",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/benefits-of-peptide-therapy/"
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/platelet-rich-plasma-treatment/#service",
      "serviceType": "PRP Therapy",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/platelet-rich-plasma-treatment/"
    },
    {
      "@type": "Service",
      "@id": "https://purehealthdx.com/services/pain-management/#service",
      "serviceType": "Pain Management",
      "provider": { "@id": "https://purehealthdx.com/#organization" },
      "url": "https://purehealthdx.com/services/pain-management/"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://purehealthdx.com/locations/fresno/#loc",
      "name": "Fresno Clinic",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "349 E. Bullard Ave Suite 105",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93710",
        "addressCountry": "US"
      },
      "url": "https://purehealthdx.com/locations/fresno/",
      "parentOrganization": { "@id": "https://purehealthdx.com/#organization" }
    }
  ]
};



  return (
    <div className="aboutus-container">
      <Helmet>
        <link rel="canonical" href="https://purehealthdx.com/about-us/" />
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section className="aboutus-hero">
        <h1>About Us</h1>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="aboutus-section">
        <img
          className="aboutus-image"
          src="https://i.postimg.cc/SK6KjGDy/i-Stock-493796666.webp"
          alt="Athlete hurdling"
        />
        <div className="who-we-are-about-us">
          <small className="subtitle">WHO WE ARE</small>
          <h2 className="title">Pure Health and Wellness Treatment Center</h2>
          <p className="text">
            Here at Pure Health and Wellness Center, we offer a personalized approach to hormone therapy. We believe every individual has unique needs that require an equally unique solution. All our treatments are carried out by an experienced and trained medical professional. Our customer service is hard to match in this or any other industry. We offer a comprehensive experience that will leave you feeling and looking better.
          </p>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="aboutus-section">
        <div className="who-we-are-about-us">
          <small className="subtitle">WHAT WE DO</small>
          <h2 className="title">Our Mission</h2>
          <p className="text">
            Every day, millions of people feel tired or suffer from low sex drive. They miss out on life in many other ways because of low testosterone levels. Our goal is to help these individuals unleash their best selves through personalized hormone treatment.
          </p>
          <Link to="/book-appointment/" className="cta-button-about-us">
            Book an Appointment
          </Link>
        </div>
        <img
          className="aboutus-image"
          src="https://i.postimg.cc/527rmTgP/i-Stock-2160748151.webp"
          alt="Medical professional at desk"
        />
      </section>

      {/* Features */}
      <section className="features-column">
        <div className="feature-card">
          <img src="https://i.postimg.cc/wMcd024w/i-Stock-1456535850-1.webp" alt="Customer Service" />
          <p>Unmatched Customer Service</p>
        </div>
        <div className="feature-card">
          <img src="https://i.postimg.cc/Wz7QM3tK/i-Stock-1456535850-2.webp" alt="Licensed doctors" />
          <p>Supervised by Licensed Medical Doctors</p>
        </div>
        <div className="feature-card">
          <img src="https://i.postimg.cc/W1yxmxb2/i-Stock-1456535850-3.webp" alt="Experience" />
          <p>20+ Years of Experience</p>
        </div>
      </section>


      {/* CTA Footer */}
      <section className="footer-cta">
        <h2>Start Your Wellness Journey Today</h2>
        <Link to="/book-appointment/" className="cta-button-dark-about-us">
          Book an Appointment
        </Link>
      </section>

      <FooterComponent />
    </div>
  );
};

export default AboutUs;
