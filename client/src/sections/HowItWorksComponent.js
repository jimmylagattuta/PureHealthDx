import React from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorksComponent.css";

function HowItWorksComponent() {
  const navigate = useNavigate();
  
  const handleContactFormClick = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <section className="how-it-works-section" aria-labelledby="how-it-works-title">
      <div className="hero-content-title">
        <div
          className="line"
          style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}
        ></div>
        <h1
          className="company-name"
          style={{ color: "rgb(37, 54, 53)", fontSize: "0.9rem", fontWeight: "bolder" }}
        >
          HOW IT WORKS
        </h1>
        <div
          className="line"
          style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}
        ></div>
      </div>
      <h2 id="how-it-works-title" className="hiw-title">
        How Do I Get Started with LightningSEO.dev?
      </h2>
      <p className="hiw-subtitle">
        Ready to boost your online presence? Follow our simple, three-step process to get started with our comprehensive digital marketing solutions.
      </p>

      <div className="hiw-steps-container">
        {/* Step 1 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/T1zSsXbW/i-Stock-2151690936-4-1-1.webp"
              alt="Step 1: Request a Free Audit"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">1</div>
            <h3 className="hiw-step-title">Request a Free Audit</h3>
          </div>
          <p className="hiw-step-description">
            Fill out our <a href="/contact" onClick={handleContactFormClick} className="hiw-contact-link">contact form</a> to tell us about your digital challenges. Whether you need help with SEO, website improvements, or app development, we start with a complimentary audit to understand your current performance.
          </p>
        </div>

        {/* Step 2 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/FKRsVjVk/i-Stock-2151690936-5-1-1.webp"
              alt="Step 2: Strategy Consultation"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">2</div>
            <h3 className="hiw-step-title">Strategy Consultation</h3>
          </div>
          <p className="hiw-step-description">
            We review your audit results and schedule a consultation to discuss a tailored digital strategy. Our experts work with you to craft a plan that addresses your SEO, web development, mobile app, or watch app needs.
          </p>
        </div>

        {/* Step 3 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/q7Q2DXKs/i-Stock-2151690936-7-1.webp"
              alt="Step 3: Implementation & Results"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">3</div>
            <h3 className="hiw-step-title">Implementation & Results</h3>
          </div>
          <p className="hiw-step-description">
            Once the strategy is approved, we implement the plan across your digital channels. Our team continuously monitors performance and optimizes your campaigns to ensure your online presence grows and converts.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksComponent;
