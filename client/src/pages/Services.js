import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData, serviceExtras } from "../data";
import FooterComponent from "../sections/FooterComponent";
import "./Services.css";

const Services = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];
  const extras  = serviceExtras[serviceId] || {};
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = idx => setOpenFaq(openFaq === idx ? null : idx);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 569);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 569);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!serviceId) {
    return (
      <div className="services-list-page">
        <h1>Our Services</h1>
        <ul className="services-list">
          {Object.entries(servicesData).map(([slug, svc]) => (
            <li key={slug}>
              <Link to={`/services/${slug}`}>{svc.title}</Link>
            </li>
          ))}
        </ul>
        <FooterComponent />
      </div>
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

  const heroImage =
    isDesktop && service.images.desktopHero
      ? service.images.desktopHero
      : service.images.hero;

  const symptomsBg = extras.symptomsBackground || heroImage;

  return (
    <>
      <Helmet>
        <title>{service.title} | Pure Health & Wellness</title>
      </Helmet>

      {/* — Hero — */}
      <div
        className="service-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>PURE HEALTH &amp; WELLNESS</h2>
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
            <Link to={service.ctaLink || "/book"} className="hero-cta">
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
          <Link to={service.ctaLink || "/book"} className="hero-cta works-final-cta">
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

      <FooterComponent />
    </>
  );
};

export default Services;
