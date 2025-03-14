import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <picture>
        {/* Mobile Image (Default) */}
        <source
          srcSet="https://i.postimg.cc/HkMXXdZn/i-Stock-1820756302-4-1-1.webp"
          media="(max-width: 480px)"
          type="image/webp"
        />
        {/* Tablet Image */}
        <source
          srcSet="https://i.postimg.cc/QCS0LhGh/i-Stock-1820756302-3-1-1-1.webp"
          media="(max-width: 768px)"
          type="image/webp"
        />
        {/* Desktop Image */}
        <source
          srcSet="https://i.postimg.cc/k4L7Q3hM/i-Stock-1820756302-2-1.webp"
          media="(min-width: 769px)"
          type="image/webp"
        />
        {/* Fallback Image */}
        <img
          src="https://i.postimg.cc/k4L7Q3hM/i-Stock-1820756302-2-1.webp"
          alt="Handyman Services - Captain Alvarado"
          width="auto"
          height="100%"
          loading="eager"
        />
      </picture>

      <div className="hero-content">
        <div className="hero-text-bg">
          <div className="hero-content-title">
            <div className="line"></div>
            <h1 className="company-name">Captain Alvarado's Handyman</h1>
            <div className="line"></div>
          </div>
          <h1 className="slogan">Reliable & Affordable Handyman Services</h1>
          <p className="hero-paragraph">
            Captain Alvarado’s Handyman provides expert home repairs, plumbing, painting, and moving services across **San Luis Obispo County**. With a strong work ethic and dedication to quality, we ensure your home improvement projects are done right.
          </p>
          <h1 className="subslogan">Need a Hand? Get in Touch Today!</h1>
          {/* Updated Link for Contact */}
          <Link to="/contact" className="cta-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
