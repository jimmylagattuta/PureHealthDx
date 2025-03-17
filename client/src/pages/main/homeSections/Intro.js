import React, { useState, useEffect } from 'react';
import './Intro.css';

import mobileImages from './images/mobileImages';
import tabletImages from './images/tabletImages';
import desktopImages from './images/desktopImages';

export default function Intro({ scrollToContact }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(mobileImages);

  // Select the correct image array based on window width
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setImages(desktopImages);
    } else if (width >= 768) {
      setImages(tabletImages);
    } else {
      setImages(mobileImages);
    }
  };

  // Run on mount and whenever the window is resized
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Welcome to Captain Alvarado's Handyman!</h1>
          <p>Your Trusted Partner in Leisure-Filled Electric Vehicles</p>
          <button className="hero-button" onClick={scrollToContact}>
            Contact Us
          </button>
        </div>
      </div>
      <div className="hero-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`hero-image ${index === currentImage ? 'fade-in' : 'fade-out'}`}
          />
        ))}
      </div>
    </div>
  );
}
