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
  const symptomsBg = extras.symptomsBackground || heroImage;

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 569);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 569);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // LIST VIEW
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

  // NOT FOUND
  if (!service) {
    return (
      <div className="service-not-found">
        <h1>Service Not Found</h1>
        <Link to="/services">← Back to all services</Link>
      </div>
    );
  }

  // Pick hero image
  const heroImage =
    isDesktop && service.images.desktopHero
      ? service.images.desktopHero
      : service.images.hero;

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
          {service.extendedIntroText && (
            <p>{service.extendedIntroText}</p>
          )}
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
            </div>
          ))}
        </section>
      )}

      {/* — Symptoms w/ background + white card — */}
      {extras.symptoms && (
        <section
        className="symptoms-section"
        style={{
          backgroundImage: `url(${symptomsBg})`,
        }}
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
              {extras.symptoms.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
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

      <FooterComponent />
    </>
  );
};

export default Services;
