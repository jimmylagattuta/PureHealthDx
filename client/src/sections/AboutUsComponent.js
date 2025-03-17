import React from "react";
import { Link } from "react-router-dom";
import "./AboutUsComponent.css";

function AboutUsComponent() {
  return (
    <section className="about-section">
      {/* Image Container */}
      <div className="about-image-container">
        <img
          src="https://i.postimg.cc/9MGmfGw1/i-Stock-1062386108-1.webp"
          alt="About LightningSEO.dev"
          loading="lazy"
          className="about-image"
          height="56"
          width="56"
          style={{
            borderRadius: "20%",
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
        <p className="about-us-company-name">LightningSEO.dev</p>
        <p className="about-us-paragraph">
          At LightningSEO.dev, we specialize in delivering high-quality, reliable, and affordable digital marketing solutions designed to boost your online presence. Our comprehensive services range from expert SEO and content marketing strategies to cutting-edge website and mobile app development, ensuring your business stands out in the competitive digital landscape.
        </p>
        <p className="about-us-paragraph">
          With years of experience and a commitment to innovation, our skilled team leverages data-driven strategies and advanced technologies to drive measurable results for our clients. We pride ourselves on transforming online challenges into growth opportunities, helping your brand not only compete but thrive.
        </p>
        <Link to="/about-us" className="about-us-button">
          Learn More About LightningSEO.dev
        </Link>
      </div>
    </section>
  );
}

export default AboutUsComponent;
