import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData, serviceExtras, locationsData } from "../data";
import OurServicesComponent from "./../sections/OurServicesComponent";
import LocationsSection from "../sections/LocationsSection";
import PricingBanner from "../sections/PricingBanner";
import Testimonials from "../components/Testimonials";
import FooterComponent from "../sections/FooterComponent";
import "./Services.css";

const Services = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];
  const extras  = serviceExtras[serviceId] || {};
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = idx => setOpenFaq(openFaq === idx ? null : idx);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 569);
  const canonicalUrl = `https://purehealthdx.com/services/${serviceId || ""}/`;
  
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 569);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const servicesBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://purehealthdx.com/services/#breadcrumb",
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
        "item": "https://purehealthdx.com/services/"
      }
    ]
  };

  if (!serviceId) {
    // Build an ItemList schema for all services
    const allServicesItemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: Object.keys(servicesData).map((key, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://purehealthdx.com/services/${key}/`,
      })),
    };

    return (
      <>
        <Helmet>
          <title>Our Services | Pure Health & Wellness</title>
          <link
            rel="canonical"
            href="https://purehealthdx.com/services/"
          />
          <script type="application/ld+json">
            {JSON.stringify(allServicesItemList, null, 2)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(servicesBreadcrumb, null, 2)}
          </script>
        </Helmet>

        <div className="services-list-page">
          <OurServicesComponent showViewAllButton={false} />
          <PricingBanner />
          <Testimonials />
          <LocationsSection />
          <FooterComponent />
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <div className="service-not-found">
        <h1>Service Not Found</h1>
        <Link to="/services">← Back to all services</Link>
      </div>
    );
  }

    // Build the Service snippet
  const serviceImage = isDesktop && service.images.desktopHero
    ? service.images.desktopHero
    : service.images.hero;




const serviceBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${canonicalUrl}#breadcrumb`,
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
      "item": "https://purehealthdx.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": service?.title || "Service",
      "item": canonicalUrl
    }
  ]
};


    // Combine into one graph
const richSnippet = {
  "@context": "https://schema.org",
  "@graph": [
    globalServiceSnippet,
    ...locationSnippets,
    ...perLocationServiceSnippets
  ]
};


  const heroImage =
    isDesktop && service.images.desktopHero
      ? service.images.desktopHero
      : service.images.hero;

  const symptomsBg = extras.symptomsBackground || heroImage;

  return (
    <>
      <Helmet>
        <title>{service.title} | Pure Health & Wellness</title>
        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": `${canonicalUrl}#service`,
                "name": service.title,
                "description": service.shortDescription,
                "url": canonicalUrl,
                "provider": { "@id": "https://purehealthdx.com/#org" },
                "availableAtOrFrom": Object.keys(locationsData).map(slug => ({
                  "@type": "Place",
                  "@id": `https://purehealthdx.com/locations/${slug}/#loc`
                }))
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${canonicalUrl}#breadcrumb`,
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://purehealthdx.com/" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://purehealthdx.com/services/" },
                  { "@type": "ListItem", "position": 3, "name": service.title, "item": canonicalUrl }
                ]
              }
            ]
          }, null, 2)}
        </script>
      </Helmet>


      {/* — Hero — */}
      <div
        className="service-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-content-title">
              <div style={{ color: "#6d8d86 !important" }} className="line"></div>
              <h2>PURE HEALTH &amp; WELLNESS</h2>
              <div style={{ color: "#6d8d86 !important" }} className="line"></div>
            </div>
            <h1>{service.title}</h1>
            {service.heroSubtitle && (
              <p className="hero-subtitle">{service.heroSubtitle}</p>
            )}
            <Link to={service.ctaLink || "/contact"} className="hero-cta">
              {service.ctaText || "Book an Appointment"}
            </Link>
          </div>
        </div>
      </div>

      {/* — Intro — */}
      <section className="service-intro-section">
        {service.collageImage && (
          <div className="collage-wrapper">
            <img
              src={service.collageImage}
              alt={`${service.title} collage`}
              className="collage-image"
            />
          </div>
        )}
        <div className="service-intro-content">
          {service.introTitle && <h2>{service.introTitle}</h2>}
          {service.introText && <p>{service.introText}</p>}
          {service.extendedIntroText && <p>{service.extendedIntroText}</p>}
          {service.ctaLink && service.ctaText && (
            <Link to={service.ctaLink} className="hero-cta">
              {service.ctaText}
            </Link>
          )}
        </div>
      </section>


      {/* — Difference — */}
      {serviceId === 'hormone-therapy-for-women' && service.differenceTitle && (
        <section className="difference-section">
          <h2>{service.differenceTitle}</h2>
          {service.differenceText.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
          <ul className="difference-list">
            {service.differenceBullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* — Naturally Occurring Peptides — */}
      {serviceId === "benefits-of-peptide-therapy" && extras.naturallyOccurringPeptides && (
        <section className="peptide-section">
          <h2>{extras.naturallyOccurringPeptides.heading}</h2>
          {extras.naturallyOccurringPeptides.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ul className="peptide-list">
            {extras.naturallyOccurringPeptides.items.map((item, i) => (
              <li key={i}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <Link to={extras.naturallyOccurringPeptides.ctaLink} className="peptide-cta">
            {extras.naturallyOccurringPeptides.ctaText}
          </Link>
        </section>
      )}

      {serviceId === "benefits-of-peptide-therapy" &&
        extras.whyUsePeptideTherapy && (
          <section className="whyuse-peptide-section">
            <h2>{extras.whyUsePeptideTherapy.heading}</h2>
            <p>{extras.whyUsePeptideTherapy.body}</p>
            <div className="card-grid">
              {extras.whyUsePeptideTherapy.cards.map((c, i) => (
                <div key={i} className="why-card">
                  <img src={c.icon} alt={c.title} className="card-icon" />
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
          </section>
      )}

      {/* — How It Works — */}
      {serviceId === "benefits-of-peptide-therapy" && extras.howDoesPeptideWork && (
        <section className="how-peptide-section">
          <img
            src={extras.howDoesPeptideWork.image}
            alt="Peptide Therapy Illustration"
            className="how-peptide-image"
          />
          <h2>{extras.howDoesPeptideWork.heading}</h2>
          {extras.howDoesPeptideWork.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <Link to={extras.howDoesPeptideWork.ctaLink} className="hero-cta">
            {extras.howDoesPeptideWork.ctaText}
          </Link>
        </section>
      )}

      {/* — Why Do It — */}
      {serviceId === "platelet-rich-plasma-treatment" && extras.whyDoIt && (
        <section className="whydoit-section">
          <h5 className="whydoit-intro">{extras.whyDoIt.introLabel}</h5>
          <h2 className="whydoit-heading">{extras.whyDoIt.heading}</h2>
          {extras.whyDoIt.subheading && (
            <p className="whydoit-subheading">{extras.whyDoIt.subheading}</p>
          )}
          <div className="whydoit-grid">
            {extras.whyDoIt.items.map((item, i) => (
              <div key={i} className="whydoit-item">
                <img src={item.icon} alt={item.title} className="whydoit-icon" />
                <h3 className="whydoit-title">{item.title}</h3>
                <p className="whydoit-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* — Causes — */}
      {extras.causes && (
        <section className="causes-section">
          {extras.causesIntroTitle && (
            <h2 className="causes-intro-title">
              {extras.causesIntroTitle}
            </h2>
          )}
          {extras.causesIntroText && (
            <p className="causes-intro-text">
              {extras.causesIntroText}
            </p>
          )}
          {extras.causes.map((group, gi) => (
            <div key={gi} className="cause-card">
              <h3>{group.title}</h3>
              {group.description && <p>{group.description}</p>}
              <ul>
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    <strong>{item.title}</strong>
                    {item.description && <p>{item.description}</p>}
                  </li>
                ))}
              </ul>
              {group.additionalText &&
                group.additionalText.map((t, ti) => <p key={ti}>{t}</p>)
              }
              {group.ctaLink && (
                <Link to={group.ctaLink} className="hero-cta">
                  {group.ctaText}
                </Link>
              )}
            </div>
          ))}
        </section>
      )}

      {/* — Symptoms — */}
      {extras.symptoms && (
        <section
          className="symptoms-section"
          style={{ backgroundImage: `url(${symptomsBg})` }}
        >
          <div className="symptoms-card">
            {extras.symptomsIntroTitle && (
              <h2 className="symptoms-intro-title">
                {extras.symptomsIntroTitle}
              </h2>
            )}
            {extras.symptomsIntroText && (
              <p className="symptoms-intro-text">
                {extras.symptomsIntroText}
              </p>
            )}
            <ul className="symptoms-list">
              {extras.symptoms.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            {extras.symptomsConclusion && (
              <p className="symptoms-conclusion">
                {extras.symptomsConclusion}
              </p>
            )}
            <Link to={service.ctaLink || "/book-appointment/"} className="hero-cta">
              {service.ctaText || "Book an Appointment"}
            </Link>
          </div>
        </section>
      )}

      {/* — Treatment Options — */}
      {extras.treatmentOptions && (
        <section className="treatment-options-section">
          <h2>{extras.treatmentOptions.heading}</h2>
          {extras.treatmentOptions.intro.map((p, i) => <p key={i}>{p}</p>)}
          {extras.treatmentOptions.subsections.map((sec, si) => (
            <div key={si} className="treatment-subsection">
              <h3>{sec.title}</h3>
              {sec.body.map((b, bi) => <p key={bi}>{b}</p>)}
              {sec.list && (
                <ul>
                  {sec.list.map((li, lii) => <li key={lii}>{li}</li>)}
                </ul>
              )}
              {sec.footnotes && sec.footnotes.map((f, fi) => (
                <p key={fi} className="treatment-footnote">{f}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* — Medications — */}
      {extras.medications && (
        <section className="medication-section">
          <div className="medication-card">
            {extras.medications.image && (
              <div className="medication-image-wrapper">
                <img
                  src={extras.medications.image}
                  alt="medication"
                  className="medication-image"
                />
              </div>
            )}
            {extras.medications.heading && (
              <h2 className="medication-heading">
                {extras.medications.heading}
              </h2>
            )}
            {extras.medications.paragraphs.map((p, i) => (
              <p key={i} className="medication-intro">{p}</p>
            ))}
            {extras.medications.types.map((t, ti) => (
              <div key={ti} className="medication-type">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
              </div>
            ))}
            {extras.medications.conclusion && (
              <p className="medication-conclusion">
                {extras.medications.conclusion}
              </p>
            )}
            <Link to={extras.medications.ctaLink} className="hero-cta medication-cta">
              {extras.medications.ctaText}
            </Link>
          </div>
        </section>
      )}

      {/* — Benefits — */}
      {extras.benefits && (
        <section className="benefits-section">
          {extras.benefits.images?.[0] && (
            <div className="benefits-image-wrapper">
              <img
                src={extras.benefits.images[0]}
                alt="benefit"
                className="benefit-image"
              />
            </div>
          )}
          {extras.benefits.introHeading && (
            <h2 className="benefits-intro-heading">
              {extras.benefits.introHeading}
            </h2>
          )}
          {extras.benefits.cards.map((c, ci) => (
            <div key={ci} className="benefits-card">
              <h3>{c.title}</h3>
              {c.paragraphs.map((p, pi) => <p key={pi}>{p}</p>)}
            </div>
          ))}
        </section>
      )}

      {/* — Journey CTA — */}
      {extras.journey && (
        <section className="journey-cta-section">
          <h2>{extras.journey.ctaHeading}</h2>
          {extras.journey.ctaBody && (
            <p className="journey-cta-body">{extras.journey.ctaBody}</p>
          )}
          <Link to={extras.journey.ctaLink} className="hero-cta">
            {extras.journey.ctaText}
          </Link>
        </section>
      )}

      {/* — How It Works — */}
      {extras.journey?.steps?.length > 0 && (
        <section className="works-section">
          <h2 className="works-intro-heading">
            {extras.journey.introHeading}
          </h2>
          <p className="works-intro-text">
            {extras.journey.introText}
          </p>
          <div className="works-steps">
            {extras.journey.steps.map((step, i) => (
              <div key={i} className="works-step">
                <img src={step.icon} alt={step.title} className="step-icon" />
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <Link to={service.ctaLink || "/book-appointment/"} className="hero-cta works-final-cta">
            {service.ctaText || "Book an Appointment"}
          </Link>
        </section>
      )}

      {/* — FAQs — */}
      {extras.faqs?.length > 0 && (
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {extras.faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
              <button
                className="faq-question"
                onClick={() => toggleFaq(idx)}
                aria-expanded={openFaq === idx}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openFaq === idx ? "▼" : "▶"}</span>
              </button>
              {openFaq === idx && (
                <div className="faq-answer">
                  {faq.answer.split(/\n\n/).map((p, pi) => <p key={pi}>{p}</p>)}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {extras.doctorBenefits && (
        <section className="hormone-doctor-section">
          <h2 className="section-title">
            WORKING WITH A WOMEN’S HORMONE DOCTOR<br/>
            Benefits of the Treatment:
          </h2>
          <p className="section-subtitle">
            Alleviate Common Symptoms By Achieving Hormone Balance
          </p>
          <div className="card-grid">
            {extras.doctorBenefits.map((b, i) => (
              <div key={i} className="hormone-card">
                <img src={b.icon} alt={b.title} className="card-icon" />
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* — CTA Banner — */}
      {extras.ctaBanner && (
        <section className="cta-banner">
          <h2>{extras.ctaBanner.heading}</h2>
          {extras.ctaBanner.body.split(/\n\n/).map((p, i) => <p key={i}>{p}</p>)}
          <Link to={extras.ctaBanner.buttonLink} className="hero-cta">
            {extras.ctaBanner.buttonText}
          </Link>
        </section>
      )}

      {/* — Pain-Management Flyer — */}
      {serviceId === "pain-management" && (
        <section className="pain-flyer-section">
          <img
            src="https://i.postimg.cc/L84bzQhd/PHW-Flyer-1-768x994.webp"
            alt="Pain Management Flyer"
            className="pain-flyer-image"
          />
        </section>
      )}
      <PricingBanner />
      <Testimonials />
      <LocationsSection />
      <FooterComponent />
    </>
  );
};

export default Services;
