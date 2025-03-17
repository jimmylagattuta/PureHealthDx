import React from 'react';
import './Pricing.css';

const Pricing = () => {
  // Helper function to navigate to /contact
  const goToContact = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="pricing-page">
      <header className="pricing-hero">
        <div className="hero-overlay">
          <h1>LightningSEO.dev Pricing</h1>
          <p>
            Choose a plan that fits your digital needs—from ready-made website themes and custom designs to full web apps, ongoing website updates, comprehensive SEO, and more.
          </p>
        </div>
      </header>
      
      <section className="pricing-plans">
        {/* Website Theme Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-theme-desktop.jpg" />
            <img src="https://example.com/plan-theme-mobile.jpg" alt="Website Theme Package" />
          </picture>
          <h2>Website Theme Package</h2>
          <p className="price">$1,500</p>
          <ul className="plan-features">
            <li>Pre-designed, responsive theme</li>
            <li>Ready-to-launch website</li>
            <li>Delivered in 1 week or less</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Custom Website Design */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-custom-desktop.jpg" />
            <img src="https://example.com/plan-custom-mobile.jpg" alt="Custom Website Design" />
          </picture>
          <h2>Custom Website Design</h2>
          <p className="price">$3,500</p>
          <ul className="plan-features">
            <li>Unique, custom design</li>
            <li>Fully responsive &amp; SEO-optimized</li>
            <li>Delivered in about 1 month</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Web Application Development */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-webapp-desktop.jpg" />
            <img src="https://example.com/plan-webapp-mobile.jpg" alt="Web Application Development" />
          </picture>
          <h2>Web Application Development</h2>
          <p className="price">Starting at $4,000</p>
          <ul className="plan-features">
            <li>Custom-built web application</li>
            <li>Timeline: 1-3+ months (complexity dependent)</li>
            <li>Scalable, feature-rich solution</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Website Updating Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-updating-desktop.jpg" />
            <img src="https://example.com/plan-updating-mobile.jpg" alt="Website Updating Package" />
          </picture>
          <h2>Website Updating Package</h2>
          <p className="price">$250/mo</p>
          <ul className="plan-features">
            <li>Ongoing website maintenance</li>
            <li>Regular updates &amp; security patches</li>
            <li>Fixed monthly rate</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Subscribe Now</button>
        </div>

        {/* Basic SEO Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-basic-seo-desktop.jpg" />
            <img src="https://example.com/plan-basic-seo-mobile.jpg" alt="Basic SEO Package" />
          </picture>
          <h2>Basic SEO Package</h2>
          <p className="price">$800/mo</p>
          <ul className="plan-features">
            <li>On-Page SEO Optimization</li>
            <li>Basic Technical SEO Fixes</li>
            <li>Monthly Reporting</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Advanced SEO Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-advanced-seo-desktop.jpg" />
            <img src="https://example.com/plan-advanced-seo-mobile.jpg" alt="Advanced SEO Package" />
          </picture>
          <h2>Advanced SEO Package</h2>
          <p className="price">$1,500/mo</p>
          <ul className="plan-features">
            <li>Comprehensive On-Page &amp; Technical SEO</li>
            <li>Local SEO &amp; Content Strategy</li>
            <li>Monthly SEO Audit &amp; Advanced Reporting</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Social Media Management */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-social-desktop.jpg" />
            <img src="https://example.com/plan-social-mobile.jpg" alt="Social Media Management" />
          </picture>
          <h2>Social Media Management</h2>
          <p className="price">$1,200/mo</p>
          <ul className="plan-features">
            <li>Content creation &amp; scheduling</li>
            <li>Engagement &amp; community management</li>
            <li>Monthly performance reports</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Digital Marketing Consulting */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://example.com/plan-consulting-desktop.jpg" />
            <img src="https://example.com/plan-consulting-mobile.jpg" alt="Digital Marketing Consulting" />
          </picture>
          <h2>Digital Marketing Consulting</h2>
          <p className="price">$2,000/mo</p>
          <ul className="plan-features">
            <li>Custom strategy development</li>
            <li>Competitive analysis</li>
            <li>Ongoing support &amp; optimization</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
