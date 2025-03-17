import React, { useEffect, useRef } from 'react';
import './Company.css';

function Company() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add('reveal');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="company-diagonal-section" ref={sectionRef}>
      <div className="diagonal-reveal"></div>
      <div className="company-content">
        <hr className="custom-line" /> {/* Line added above */}
        <h2 className="company-title">At Captain Alvarado's Handyman</h2>
        <p className="company-description">
            We specialize in providing high-quality electric carts and allied services. With locations in Long Beach, California, and Griffin or Locust Grove, Georgia, we are dedicated to offering top-notch solutions for your low-speed vehicle needs.
        </p>
        <hr className="custom-line" /> {/* Line added below */}
      </div>
    </section>
  );
}

export default Company;
