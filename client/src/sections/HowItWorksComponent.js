import React from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorksComponent.css";

function HowItWorksComponent() {
  const navigate = useNavigate();

  const handleBecomePatientClick = (e) => {
    e.preventDefault();
    navigate("/book-appointment/");
  };

  return (
    <section
      className="how-it-works-section"
      aria-labelledby="how-it-works-title"
    >
      <div className="hero-content-title">
        <div
          className="line"
          style={{
            backgroundColor: "rgb(37, 54, 53)",
            width: "40px",
            height: "2px",
          }}
        />
        <h1
          className="company-name"
          style={{
            color: "rgb(37, 54, 53)",
            fontSize: "0.9rem",
            fontWeight: "bolder",
          }}
        >
          HOW IT WORKS
        </h1>
        <div
          className="line"
          style={{
            backgroundColor: "rgb(37, 54, 53)",
            width: "40px",
            height: "2px",
          }}
        />
      </div>

      <h2 id="how-it-works-title" className="hiw-title">
        How Do I Become A Patient?
      </h2>
      <p className="hiw-subtitle">
        Ready to find out how you become a patient. Just follow the easy
        step-by-step process below.
      </p>

      <div className="hiw-steps-container">
        {/* Step 1 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/yd9Hqs2B/book-your-appointment-1-1.webp"        // ← swap in your “finger + check” SVG
              alt="Start Your Journey"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">1</div>
            <h3 className="hiw-step-title">Start Your Journey</h3>
          </div>
          <p className="hiw-step-description">
            <a
              href="/book-appointment"
              onClick={handleBecomePatientClick}
              className="hiw-contact-link"
            >
              Complete the new patient intake form
            </a>{" "}
            and confirm your service subscription. Start now!
          </p>
        </div>

        {/* Step 2 */}

        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/qRGkFp9Y/take-your-prescription-icon-2.webp"        // ← swap in your “labs + paper” SVG
              alt="Complete Labs"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">2</div>
            <h3 className="hiw-step-title">Complete Labs</h3>
          </div>
          <p className="hiw-step-description">
            Schedule and bring your lab request to one of the Lab Corp nationwide
            offices.
          </p>
        </div>

        {/* Step 3 */}
        <div className="hiw-step">
          <div className="hiw-step-icon">
            <img
              src="https://i.postimg.cc/Qd4s16pL/live-an-awesome-life-icon-1.webp"        // ← swap in your “provider” SVG
              alt="Review Lab Results With Provider"
              width="55"
              height="65"
              loading="lazy"
            />
          </div>
          <div className="hiw-step-number-container">
            <div className="hiw-step-number">3</div>
            <h3 className="hiw-step-title">Review Lab Results With Provider</h3>
          </div>
          <p className="hiw-step-description">
            One of our providers will schedule a time to review your lab results,
            medical history, current symptoms, goals and needs, and discuss
            possible treatment options if you are a qualified patient candidate.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksComponent;
