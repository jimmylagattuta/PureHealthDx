import React from "react";
import { Link } from "react-router-dom";
import "./AboutUsComponent.css";

function AboutUsComponent() {
  return (
    <section className="about-section">
      {/* Image Container */}
      <div className="about-image-container">
        <img
          src="https://i.postimg.cc/ryRx3Mq9/i-Stock-588965276-1.webp"
          alt="About Captain Alvarado's Handyman"
          loading="lazy"
          className="about-image"
          height="56"
          width="56"
        />
      </div>

      {/* Text Container */}
      <div className="about-content">
        <div className="about-us-content-title">
          <div className="about-us-line"></div>
          <h1 className="about-us-name">ABOUT US</h1>
        </div>
        <p className="about-us-company-name">Captain Alvarado's Handyman</p>
        <p className="about-us-paragraph">
          At Captain Alvarado's Handyman, we take pride in providing high-quality, reliable, and affordable handyman services across San Luis Obispo County. From home repairs and plumbing fixes to painting, moving assistance, and clean-outs, we are your trusted partner for all things maintenance and improvement.
        </p>
        <p className="about-us-paragraph">
          With years of experience and a commitment to excellence, our skilled team ensures every project is completed with professionalism and attention to detail. No job is too small—we handle each task with care, making sure your home or business stays in top shape.
        </p>
        <Link to="/about-us" className="about-us-button">
          Learn More About Captain Alvarado's Handyman
        </Link>
      </div>
    </section>
  );
}

export default AboutUsComponent;
