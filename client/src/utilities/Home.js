import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from "../sections/HeroSection";

// Lazy-load everything else:
const FooterComponent = lazy(() => import('../sections/FooterComponent'));
const PricingBanner = lazy(() => import('../sections/PricingBanner'));
const AboutUsComponent = lazy(() => import('../sections/AboutUsComponent'));
const Contact = lazy(() => import('../pages/main/Contact'));
const PlaquesComponent = lazy(() => import("../sections/PlaquesComponent"));
const OurServicesComponent = lazy(() => import("../sections/OurServicesComponent"));
const HowItWorksComponent = lazy(() => import("../sections/HowItWorksComponent"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const LocationsSection = lazy(() => import("../sections/LocationsSection"));

const Home = ({ scrollToContact, reviews }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    // Load lazy sections immediately after Home mounts (adjust delay if needed)
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Rich snippet updated for LightningSEO.dev digital services
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LightningSEO.dev",
    "url": "https://lightningseo.dev",
    "logo": "https://i.postimg.cc/QtwR2GW9/i-Stock-1502494966-1.webp",
    "description": "LightningSEO.dev offers affordable, high-performance digital marketing solutions including expert SEO, website development, mobile app development, and Apple Watch app development to boost your online presence.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-000-000-0000",
      "contactType": "Customer Service",
      "availableLanguage": ["English"],
      "email": "jimmy.lagattuta@gmail.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "On-Page SEO Optimization",
            "description": "Optimize your website’s content, meta tags, and structure for higher search rankings.",
            "url": "https://lightningseo.dev/services/on-page-seo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO & Website Performance",
            "description": "Improve your website’s technical health and speed for better user experience.",
            "url": "https://lightningseo.dev/services/technical-seo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development & Design",
            "description": "Create responsive, SEO-friendly websites that represent your brand.",
            "url": "https://lightningseo.dev/services/web-development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Application Development",
            "description": "Design and develop mobile apps for iOS and Android platforms.",
            "url": "https://lightningseo.dev/services/mobile-app"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apple Watch App Development",
            "description": "Build companion apps for Apple Watch to extend your digital ecosystem.",
            "url": "https://lightningseo.dev/services/watch-app"
          }
        }
      ]
    }
  };

  return (
    <div>
      <Helmet>
        <title>Pure Health & Wellness | Hormone & Wellness Clinic</title>
        <meta
          name="description"
          content="Pure Health & Wellness specializes in hormone therapy, weight loss, ED treatment, and personalized telehealth services. Book your consultation today."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Pure Health & Wellness",
            url: "https://purehealthdx.com",
            logo: "https://i.postimg.cc/tTy4LRpb/footer-logo-1-1.webp",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-000-000-0000",
              contactType: "Customer Service",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "California",
              addressRegion: "CA",
              addressCountry: "US",
            },
          })}
        </script>
      </Helmet>

      
      <HeroSection />

      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <PricingBanner />
          <AboutUsComponent />
          {/* <Contact /> */}
          <PlaquesComponent />
          <OurServicesComponent />
          <HowItWorksComponent />

          <LocationsSection />
          <FooterComponent />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
