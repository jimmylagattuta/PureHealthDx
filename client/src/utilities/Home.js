import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from "../sections/HeroSection";

const FooterComponent = lazy(() => import('../sections/FooterComponent'));
const PricingBanner = lazy(() => import('../sections/PricingBanner'));
const Testimonials = lazy(() => import("../components/Testimonials"));
const AboutUsComponent = lazy(() => import('../sections/AboutUsComponent'));
const Contact = lazy(() => import('../pages/main/Contact'));
const PlaquesComponent = lazy(() => import("../sections/PlaquesComponent"));
const OurServicesComponent = lazy(() => import("../sections/OurServicesComponent"));
const HowItWorksComponent = lazy(() => import("../sections/HowItWorksComponent"));
const LocationsSection = lazy(() => import("../sections/LocationsSection"));

const Home = ({ scrollToContact, reviews }) => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const homeBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://purehealthdx.com/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebPage",
          "@id": "https://purehealthdx.com/"
        }
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>California's Lowest Priced Men's TRT | Pure Health & Wellness</title>
        <meta
          name="description"
          content="Pure Health & Wellness offers personalized testosterone replacement therapy (TRT), hormone therapy for men and women, ED treatment, weight loss, and telehealth across California — including Fresno, Bakersfield, San Jose, and more."
        />
        <link rel="canonical" href="https://purehealthdx.com/" />
        <script type="application/ld+json">
          {JSON.stringify(homeBreadcrumb, null, 2)}
        </script>
      </Helmet>

      <HeroSection />

      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <PricingBanner />
          <Testimonials />
          <AboutUsComponent />
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
