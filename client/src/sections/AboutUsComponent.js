import React from "react";
import { Link } from "react-router-dom";
import "./AboutUsComponent.css";

function AboutUsComponent() {
  return (
    <section className="about-section">
      {/* Image Container */}
      <div className="about-image-container">
        <img
          src="https://res.cloudinary.com/djtsuktwb/image/upload/w_350,h_328,c_fill,f_webp/v1743119059/iStock-590156088_qdiubp.webp"
          alt="About Pure Health & Wellness"
          loading="lazy"
          className="about-image"
          height="328"
          width="350"
          style={{
            borderRadius: "5%",
            WebkitMaskImage: "radial-gradient(circle, white 70%, transparent 100%)",
            maskImage: "radial-gradient(circle, white 70%, transparent 100%)"
          }}
        />
      </div>

      {/* Text Container */}
      <div className="about-content">
        <div className="about-us-content-title">
          <div className="about-us-line"></div>
          <h1 className="about-us-name">ABOUT US</h1>
        </div>
        <p className="about-us-company-name">Pure Health & Wellness</p>
        <p className="about-us-paragraph">
          We are a Fresno, CA based health and wellness company specializing in hormone replacement therapy, peptide therapy, erectile dysfunction treatment, and hormonal therapy for weight loss. Our customized solutions help patients of all ages overcome low testosterone levels and hormone imbalance. With our help and specialized hormone replacement methods, you can lose weight, build more muscle, have a higher libido, and have a higher quality of life.
        </p>
        <p className="about-us-paragraph">
          The process to become a patient is simple. Book your appointment, schedule your labs, meet with one of our providers, and have your prescription sent straight to your doorstep. We guarantee that your quality of life will improve. We aren’t the local men’s health clinic or male hormone replacement therapy clinic that just prescribes testosterone. Our medical providers are specialists, licensed, and have decades of experience treating patients. Our providers offer a personalized approach to TRT and HRT. We believe every individual has unique needs that require an equally unique solution. It’s time to unleash the best version of yourself with the help of Pure Health & Wellness.
        </p>
        <Link to="/about-us/" className="about-us-button">
          Learn More About Pure Health & Wellness
        </Link>
      </div>
    </section>
  );
}

export default AboutUsComponent;
