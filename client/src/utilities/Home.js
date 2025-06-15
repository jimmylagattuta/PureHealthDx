import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from "../sections/HeroSection";

// Lazy-load everything else:
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
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    // Load lazy sections immediately after Home mounts (adjust delay if needed)
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


  // Rich snippet updated for LightningSEO.dev digital services
  const richSnippetGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://purehealthdx.com/#org",
        "name": "Pure Health & Wellness",
        "url": "https://purehealthdx.com/",
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
        "url": "https://purehealthdx.com/",
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
        "url": "https://purehealthdx.com/",
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
          {`
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://purehealthdx.com/#org",
            "name": "Pure Health & Wellness",
            "url": "https://purehealthdx.com/",
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
            "url": "https://purehealthdx.com/",
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
            "url": "https://purehealthdx.com/",
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
            ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "25",
            "bestRating": "5",
            "worstRating": "4"
          },

            "address": {
              "@type": "PostalAddress",
              "streetAddress": "349 E. Bullard Ave Suite 105",
              "addressLocality": "Fresno",
              "addressRegion": "CA",
              "postalCode": "93710",
              "addressCountry": "US"
            }
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/testosterone-replacement-therapy/#service",
            "serviceType": "Testosterone Replacement Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/testosterone-replacement-therapy/",
            "description": "Get your energy, motivation, and sex drive back with physician-guided testosterone replacement therapy (TRT). Our TRT program helps men with hypogonadism restore hormone levels through injections or creams, with results often visible in 3–6 weeks.",
            "offers": {
              "@type": "Offer",
              "price": "89.99",
              "priceCurrency": "USD",
              "description": "Starting price per month when purchasing 2.5 months at a time. Includes remote consultation, prescription therapy, and ongoing care check-ins."
            }
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/hormone-therapy-for-women/#service",
            "serviceType": "Hormone Therapy for Women",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/hormone-therapy-for-women",
            "description": "Bioidentical hormone therapy to relieve menopausal symptoms and balance female hormones."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/erectile-dysfunction-treatment/#service",
            "serviceType": "Erectile Dysfunction Treatment",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/erectile-dysfunction-treatment/",
            "description": "Advanced ED treatments including medications, injections, and shockwave therapy."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/benefits-of-peptide-therapy/#service",
            "serviceType": "Peptide Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/benefits-of-peptide-therapy/",
            "description": "Targeted peptide protocols for muscle growth, fat loss, immune health, and anti-aging."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/platelet-rich-plasma-treatment/#service",
            "serviceType": "Platelet-Rich Plasma Therapy",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/platelet-rich-plasma-treatment/",
            "description": "PRP injections using your own blood to accelerate healing and tissue regeneration."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/pain-management/#service",
            "serviceType": "Pain Management",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/pain-management/",
            "description": "Comprehensive pain management combining image-guided injections, therapies, and referrals."
          },
          {
            "@type": "Service",
            "@id": "https://purehealthdx.com/services/semaglutide-weight-loss/#service",
            "serviceType": "Semaglutide Weight Loss Program",
            "provider": { "@id": "https://purehealthdx.com/#clinic" },
            "url": "https://purehealthdx.com/services/semaglutide-weight-loss/",
            "description": "Achieve real, sustainable weight loss with our physician-supervised Semaglutide program. Starting at just $229/month, our treatment includes appetite control, metabolic support, and personalized care with free online consultations and home delivery.",
            "offers": {
              "@type": "Offer",
              "price": "229.00",
              "priceCurrency": "USD",
              "description": "Starting price for Semaglutide Weight Loss Program up to 1mg dosage. Includes supplies and provider access. Higher doses available for additional fee."
            }
          },
          {
            "@type": "MedicalClinic",
            "@id": "https://purehealthdx.com/locations/santa-rosa/#loc",
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
            "@id": "https://purehealthdx.com/locations/sacramento/#loc",
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
            "@id": "https://purehealthdx.com/locations/stockton/#loc",
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
            "@id": "https://purehealthdx.com/locations/modesto/#loc",
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
            "@id": "https://purehealthdx.com/locations/hayward/#loc",
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
            "@id": "https://purehealthdx.com/locations/salinas/#loc",
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
            "@id": "https://purehealthdx.com/locations/san-jose/#loc",
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
            "@id": "https://purehealthdx.com/locations/fresno/#loc",
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
            "@id": "https://purehealthdx.com/locations/hanford/#loc",
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
            "@id": "https://purehealthdx.com/locations/bakersfield/#loc",
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
          }
        ]
      }
          `}
        </script>
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
