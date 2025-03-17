import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from "../sections/HeroSection";


// Lazy-load everything else:
const LazySocial = lazy(() => import('../components/Social'));
const FooterComponent = lazy(() => import('../sections/FooterComponent'));
const AboutUsComponent = lazy(() => import('../sections/AboutUsComponent'));
const Contact = lazy(() => import('../pages/main/Contact'));
const PlaquesComponent = lazy(() => import("../sections/PlaquesComponent"));
const OurServicesComponent = lazy(() => import("../sections/OurServicesComponent"));
const HowItWorksComponent = lazy(() => import("../sections/HowItWorksComponent"));
const LocationsSection = lazy(() => import("../sections/LocationsSection"));
const Home = ({ scrollToContact, reviews }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  // Decide when to load the rest: immediately, after a small delay, or on user action
  useEffect(() => {
    // Example: load them immediately after Home mounts
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0); // or 1000ms, 2000ms, etc.

    return () => clearTimeout(timer);
  }, []);

  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Captain Alvarado's Handyman",
    "url": "https://captainalvaradohandyman.com",
    "logo": "https://i.postimg.cc/8zTwpFPD/Screenshot-2025-03-14-020908-1.webp",
    "description": "Captain Alvarado's Handyman provides expert home repairs, plumbing, painting, moving assistance, and clean-out services in San Luis Obispo County and surrounding areas.",
    "founder": {
      "@type": "Person",
      "name": "Brandon Alvarado",
      "jobTitle": "Founder & Lead Handyman"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-805-835-1774",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Spanish"],
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
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Handyman Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Repairs",
            "description": "General home maintenance, drywall patching, minor electrical fixes, and small repairs.",
            "url": "https://captainalvaradohandyman.com/services/home-repairs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing Services",
            "description": "Fixing leaks, unclogging drains, replacing faucets, and minor plumbing solutions.",
            "url": "https://captainalvaradohandyman.com/services/plumbing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Painting Services",
            "description": "Interior and exterior painting, touch-ups, and refinishing.",
            "url": "https://captainalvaradohandyman.com/services/painting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Moving Assistance",
            "description": "Furniture moving, heavy lifting, and packing assistance.",
            "url": "https://captainalvaradohandyman.com/services/moving"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Clean-Out Services",
            "description": "Garage, attic, and rental property clean-outs, junk removal.",
            "url": "https://captainalvaradohandyman.com/services/clean-outs"
          }
        }
      ]
    }
  };
  

  return (
    <div>
        <Helmet>
            <script type="application/ld+json">
            {JSON.stringify(richSnippet)}
            </script>
            <title>BCB Carts - Your Trusted Partner in Electric Carts</title>
            <meta
            name="description"
            content="Discover BCB Carts – your trusted partner in leisure-filled electric vehicles. We offer premium cart sales, rentals, installs, lithium upgrades, parts, pressure wash, custom weld, and electronics upgrades."
            />
        </Helmet>
      {/* Eager-load only Intro */}

      <HeroSection />


      {/* Conditionally render everything else */}
      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          {/* <LazySocial /> */}
          <AboutUsComponent />
          <Contact />
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
