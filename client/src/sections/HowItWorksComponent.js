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
        <div className="line" style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}></div>
        <h1 className="company-name" style={{ color: "rgb(37, 54, 53)", fontSize: "0.9rem", fontWeight: "bolder" }}>
          HOW IT WORKS
        </h1>
        <div className="line" style={{ backgroundColor: "rgb(37, 54, 53)", width: "40px", height: "2px" }}></div>
      </div>
      <h2 id="how-it-works-title" className="hiw-title">
        How Do I Get Started with Captain Alvarado's Handyman?
      </h2>
      <p className="hiw-subtitle">
        Need expert handyman services? Follow our simple, three-step process to get started with top-quality home repairs, plumbing, painting, and more.
      </p>

      <div className="hiw-steps-container">
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img src="https://i.postimg.cc/T1zSsXbW/i-Stock-2151690936-4-1-1.webp" alt="Step 1: Request Service" width="55" height="65" loading="lazy" />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">1</div>
            <h3 className="hiw-step-title">Request Service</h3>
          </div>
          <p className="hiw-step-description">
            Fill out our <a href="/contact" onClick={handleContactFormClick} className="hiw-contact-link">contact form</a> to let us know what you need. Whether it’s home repairs, plumbing, painting, or moving assistance, we’re here to help.
          </p>
        </div>

        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img src="https://i.postimg.cc/FKRsVjVk/i-Stock-2151690936-5-1-1.webp" alt="Step 2: Free Consultation" width="55" height="65" loading="lazy" />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">2</div>
            <h3 className="hiw-step-title">Free Consultation</h3>
          </div>
          <p className="hiw-step-description">
            We’ll review your request and discuss the best solutions for your project. Our team ensures transparency, fair pricing, and expert advice.
          </p>
        </div>

        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img src="https://i.postimg.cc/q7Q2DXKs/i-Stock-2151690936-7-1.webp" alt="Step 3: Service Completion" width="55" height="65" loading="lazy" />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">3</div>
            <h3 className="hiw-step-title">Get the Job Done</h3>
          </div>
          <p className="hiw-step-description">
            Once scheduled, our skilled team will arrive on time, complete the work professionally, and ensure your satisfaction with our handyman services.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksComponent;
