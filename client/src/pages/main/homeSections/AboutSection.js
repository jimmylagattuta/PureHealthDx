import React, { useEffect, useRef } from 'react';
import './AboutSection.css';

function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section && window.scrollY + window.innerHeight > section.offsetTop) {
        section.classList.add('in-view');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-image"></div>
      <div className="about-content">
        <h2 className="about-title">Why Choose Us?</h2>
        <div className="about-description">
          <div className="description-pair">
            <span className="highlight">Expertise</span>
            <p className="description-text">
              With years of experience in the industry, we understand the unique needs of our customers and are committed to delivering excellence with every transaction.
            </p>
          </div>
          <div className="description-pair">
            <span className="highlight">Satisfaction</span>
            <p className="description-text">
              Your satisfaction is our priority. We strive to provide exceptional service that meets your needs with precision and professionalism.
            </p>
          </div>
          <div className="description-pair">
            <span className="highlight">Knowledgeable</span>
            <p className="description-text">
              Our team is knowledgeable about the specific regulations and requirements in California and Georgia, ensuring you get the right solutions tailored to your location.
            </p>
          </div>
        </div>
        <button className="about-button">Our Reviews</button>
      </div>
    </section>
  );
}

export default AboutSection;
