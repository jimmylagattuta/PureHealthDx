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
        {/* Website Theme Package - Always first */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/NMSX6Vdc/i-Stock-926685790.webp" />
            <img src="https://i.postimg.cc/NMSX6Vdc/i-Stock-926685790.webp" alt="Website Theme Package" />
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
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/hPqzKVwp/i-Stock-1453026064.webp" />
            <img src="https://i.postimg.cc/hPqzKVwp/i-Stock-1453026064.webp" alt="Custom Website Design" />
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
        {/* The rest of the plans sorted alphabetically */}

        {/* Free Website + 5% Commission */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/NMpJQgGx/i-Stock-1483031770.webp" />
            <img src="https://i.postimg.cc/NMpJQgGx/i-Stock-1483031770.webp" alt="Free Website with Commission" />
          </picture>
          <h2>Free Website + 5% Commission</h2>
          <p className="price">No Upfront Cost</p>
          <ul className="plan-features">
            <li>Professional, fully responsive website</li>
            <li>Zero upfront fee</li>
            <li>5% commission on sales through the site</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        
        {/* Advanced SEO Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/J0Q1rHD2/i-Stock-950615676.webp" />
            <img src="https://i.postimg.cc/J0Q1rHD2/i-Stock-950615676.webp" alt="Advanced SEO Package" />
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

        {/* Basic SEO Package */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/VkkNNgFB/i-Stock-1468849447.webp" />
            <img src="https://i.postimg.cc/VkkNNgFB/i-Stock-1468849447.webp" alt="Basic SEO Package" />
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


        {/* Digital Marketing Consulting */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/PqZnfv0Q/i-Stock-2200240773.webp" />
            <img src="https://i.postimg.cc/PqZnfv0Q/i-Stock-2200240773.webp" alt="Digital Marketing Consulting" />
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

        {/* Social Media Management */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/9QkcQh0C/i-Stock-2187086312.webp" />
            <img src="https://i.postimg.cc/9QkcQh0C/i-Stock-2187086312.webp" alt="Social Media Management" />
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

        {/* Web Application Development */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/13m8qsyF/i-Stock-2197058169.webp" />
            <img src="https://i.postimg.cc/13m8qsyF/i-Stock-2197058169.webp" alt="Web Application Development" />
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
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/QdfHgwMy/i-Stock-2197058200.webp" />
            <img src="https://i.postimg.cc/QdfHgwMy/i-Stock-2197058200.webp" alt="Website Updating Package" />
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
      </section>
    </div>
  );
};

export default Pricing;
