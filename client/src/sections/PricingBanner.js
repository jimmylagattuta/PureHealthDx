// src/components/PricingBanner.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PricingBanner.css';

export default function PricingBanner() {
  return (
    <section className="pricing-banner">
      <div className="pricing-decor-top" />

      <h2 className="pricing-title">California's lowest priced Men's TRT</h2>

      <div className="pricing-amount">
        <span className="dollar-sign">$</span>
        <span className="price">89</span>
        <span className="cents">.99</span>
        <span className="per-month">/mo</span>
      </div>

      <p className="pricing-note">
        *When purchasing 2 1/2 months at a time. This pricing structure is fixed and cannot be adjusted.
      </p>

      <Link to="/book-appointment" className="pricing-cta">
        Get Started
      </Link>
      <div className="pricing-features">
        {[
          'Remote Doctor Consultations',
          'Personalized Health Evaluation',
          'Ongoing Care Check-Ins',
          'Dedicated Patient Advocate',
          'Therapies Shipped to Your Door',

        ].map((text, i) => (
          <div key={i} className="feature-item">
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="pricing-decor-btm" />
    </section>
);
}
