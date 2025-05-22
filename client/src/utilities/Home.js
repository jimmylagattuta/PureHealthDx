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
  const richSnippetGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://purehealthdx.com/#org",
        "name": "Pure Health & Wellness",
        "url": "https://purehealthdx.com",
        "logo": "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-877-271-0203",
            "contactType": "Customer Service",
            "areaServed": "US",
            "availableLanguage": ["English","Spanish"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/PureHealthDx",
          "https://www.instagram.com/purehealthdx/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://purehealthdx.com/#website",
        "url": "https://purehealthdx.com",
        "name": "Pure Health & Wellness",
        "description": "Pure Health & Wellness is a leading telehealth clinic specializing in hormone replacement therapy, regenerative treatments, and pain management across multiple California locations.",
        "publisher": { "@id": "https://purehealthdx.com/#org" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://purehealthdx.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "MedicalClinic",
        "@id": "https://purehealthdx.com/#clinic",
        "name": "Pure Health & Wellness",
        "description": "Innovative health clinic offering testosterone therapy, hormone therapy, erectile dysfunction treatment, peptide therapy, PRP, and comprehensive pain management.",
        "image": "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp",
        "url": "https://purehealthdx.com",
        "telephone": "+1-877-271-0203",
        "priceRange": "$$",
        "parentOrganization": { "@id": "https://purehealthdx.com/#org" },
        "medicalSpecialty": ["Endocrinology","Regenerative Medicine","Pain Management"],
        "areaServed": { "@type":"Country","name":"United States" },
        "openingHoursSpecification": [
          {
            "@type":"OpeningHoursSpecification",
            "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens":"08:00",
            "closes":"17:00"
          }
        ]
      },
      // … all your <Service> entries here …
      // … all your <MedicalClinic location> entries here …
      {
        "@type": "BreadcrumbList",
        "@id": "https://purehealthdx.com/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://purehealthdx.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services","item": "https://purehealthdx.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Testosterone Replacement Therapy", "item": "https://purehealthdx.com/services/testosterone-replacement-therapy" }
        ]
      }
    ]
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
          {`
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://purehealthdx.com/#org",
            "name": "Pure Health & Wellness",
            "url": "https://purehealthdx.com",
            "logo": "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-877-271-0203",
                "contactType": "Customer Service",
                "areaServed": "US",
                "availableLanguage": ["English","Spanish"]
              }
            ],
            "sameAs": [
              "https://www.facebook.com/PureHealthDx",
              "https://www.instagram.com/purehealthdx/"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://purehealthdx.com/#website",
            "url": "https://purehealthdx.com",
            "name": "Pure Health & Wellness",
            "description": "Pure Health & Wellness is a leading telehealth clinic specializing in hormone replacement therapy, regenerative treatments, and pain management across multiple California locations.",
            "publisher": { "@id": "https://purehealthdx.com/#org" },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://purehealthdx.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/#clinic",
            "name": "Pure Health & Wellness",
            "description": "Innovative health clinic offering testosterone therapy, hormone therapy, erectile dysfunction treatment, peptide therapy, PRP, and comprehensive pain management.",
            "image": "https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp",
            "url": "https://purehealthdx.com",
            "telephone": "+1-877-271-0203",
            "priceRange": "$$",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" },
            "medicalSpecialty": ["Endocrinology","Regenerative Medicine","Pain Management"],
            "areaServed": { "@type":"Country","name":"United States" },
            "openingHoursSpecification": [
              {
                "@type":"OpeningHoursSpecification",
                "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],
                "opens":"08:00",
                "closes":"17:00"
              }
            ]
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/testosterone-replacement-therapy#service",
            "serviceType": "Testosterone Replacement Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/testosterone-replacement-therapy",
            "description": "Customized testosterone replacement therapy to restore energy, libido, and overall vitality."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/hormone-therapy-for-women#service",
            "serviceType": "Hormone Therapy for Women",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/hormone-therapy-for-women",
            "description": "Bioidentical hormone therapy to relieve menopausal symptoms and balance female hormones."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/erectile-dysfunction-treatment#service",
            "serviceType": "Erectile Dysfunction Treatment",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/erectile-dysfunction-treatment",
            "description": "Advanced ED treatments including medications, injections, and shockwave therapy."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/benefits-of-peptide-therapy#service",
            "serviceType": "Peptide Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/benefits-of-peptide-therapy",
            "description": "Targeted peptide protocols for muscle growth, fat loss, immune health, and anti-aging."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/platelet-rich-plasma-treatment#service",
            "serviceType": "Platelet-Rich Plasma Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/platelet-rich-plasma-treatment",
            "description": "PRP injections using your own blood to accelerate healing and tissue regeneration."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/pain-management#service",
            "serviceType": "Pain Management",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/pain-management",
            "description": "Comprehensive pain management combining image-guided injections, therapies, and referrals."
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/santa-rosa#loc",
            "name": "Santa Rosa Clinic",
            "image": "https://i.postimg.cc/8cBRDRnQ/i-Stock-1878629507-2-1-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "864 2nd Street Suite B",
              "addressLocality": "Santa Rosa",
              "addressRegion": "CA",
              "postalCode": "95404",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/sacramento#loc",
            "name": "Sacramento Clinic",
            "image": "https://i.postimg.cc/K8NmLRCG/i-Stock-2159424867-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "7275 E. Southgate Drive Suite 306",
              "addressLocality": "Sacramento",
              "addressRegion": "CA",
              "postalCode": "95823",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/stockton#loc",
            "name": "Stockton Clinic",
            "image": "https://i.postimg.cc/KjyWJ5gd/i-Stock-1357814327-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "420 Acacia Street Suite 19",
              "addressLocality": "Stockton",
              "addressRegion": "CA",
              "postalCode": "95203",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/modesto#loc",
            "name": "Modesto Clinic",
            "image": "https://i.postimg.cc/QdpHz8Pw/i-Stock-1343463188-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1130 Coffee Road BLDG 2B",
              "addressLocality": "Modesto",
              "addressRegion": "CA",
              "postalCode": "95355",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/hayward#loc",
            "name": "Hayward Clinic",
            "image": "https://i.postimg.cc/Hnwkh3v5/i-Stock-1135194294-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "24700 Calaroga Ave Suite 103",
              "addressLocality": "Hayward",
              "addressRegion": "CA",
              "postalCode": "94545",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/salinas#loc",
            "name": "Salinas Clinic",
            "image": "https://i.postimg.cc/MTzPBG2S/i-Stock-1176374269-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "945 N. Blanco Suite A",
              "addressLocality": "Salinas",
              "addressRegion": "CA",
              "postalCode": "93901",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/san-jose#loc",
            "name": "San Jose Clinic",
            "image": "https://i.postimg.cc/13PWgKkd/i-Stock-465837688-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2375 Montpelier Drive Suite 10",
              "addressLocality": "San Jose",
              "addressRegion": "CA",
              "postalCode": "95116",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/fresno#loc",
            "name": "Fresno Clinic",
            "image": "https://i.postimg.cc/cH87kgqY/i-Stock-588965234-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "349 E. Bullard Ave Suite 105",
              "addressLocality": "Fresno",
              "addressRegion": "CA",
              "postalCode": "93710",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/hanford#loc",
            "name": "Hanford Clinic",
            "image": "https://i.postimg.cc/50qytbLT/i-Stock-2198440524-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1004 N. Douty Street",
              "addressLocality": "Hanford",
              "addressRegion": "CA",
              "postalCode": "93230",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/bakersfield#loc",
            "name": "Bakersfield Clinic",
            "image": "https://i.postimg.cc/ZnCGMLbH/i-Stock-2178001181-1.webp",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "3550 Q. Street Suite 105",
              "addressLocality": "Bakersfield",
              "addressRegion": "CA",
              "postalCode": "93301",
              "addressCountry": "US"
            },
            "telephone": "+1-877-271-0203",
            "openingHours": "Mo–Fr 08:00–17:00",
            "parentOrganization": { "@id": "https://purehealthdx.com/#org" }
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://purehealthdx.com/#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://purehealthdx.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://purehealthdx.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Testosterone Replacement Therapy",
                "item": "https://purehealthdx.com/services/testosterone-replacement-therapy"
              }
            ]
          }
        ]
      }
          `}
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
