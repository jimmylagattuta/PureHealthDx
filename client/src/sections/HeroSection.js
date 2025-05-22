import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <picture>
        {/* Mobile Image */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/w_auto,dpr_auto,f_auto,q_auto/v1743042048/home-header-bg-mobile_1_ysenpc.webp"
          media="(max-width: 480px)"
          type="image/webp"
        />
        {/* Tablet Image */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/v1743045314/home-header-bg-mobile_1_1_i0noq3.webp"
          media="(max-width: 768px)"
          type="image/webp"
        />
        {/* Desktop Image */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/v1743042048/home-header-updated-1-1-1_va1zkk.webp"
          media="(min-width: 769px)"
          type="image/webp"
        />
        {/* Fallback */}
        <img
          src="https://res.cloudinary.com/djtsuktwb/image/upload/v1743042048/home-header-updated-1-1-1_va1zkk.webp"
          alt="Pure Health & Wellness Hero"
          width="auto"
          height="100%"
          loading="eager"
          fetchpriority="high"
        />
      </picture>

      <div className="hero-content">
        <div className="hero-text-bg">
          <div className="hero-content-title">
            <div className="line"></div>
            <h2 className="company-name">PURE HEALTH & WELLNESS</h2>
            <div className="line"></div>
          </div>

          <h1 className="hero-heading" style={{ color: "white"}}>
            Unleash the Best Version of Yourself With Hormone Therapy
          </h1>

          <p className="hero-paragraph">
            Our customized solutions help patients of all ages overcome low
            testosterone and hormone imbalance. With our help and hormone
            replacement solutions, you can lose weight, build more muscle,
            have a higher libido, and live a better life.
          </p>

          <Link to="/book-appointment" className="cta-button">
            Book an Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
