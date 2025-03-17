import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebook, 
  faSnapchat, 
  faTiktok, 
  faYoutube, 
  faPinterest, 
  faThreads, 
  faInstagram 
} from "@fortawesome/free-brands-svg-icons";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer-container">
      {/* Top area with 4 columns on desktop/tablet */}
      <div className="footer-top-grid">
        {/* 1) BRAND + TAGLINE COLUMN */}
        <div className="footer-col brand-col">
          <div className="fancy-brand-row">
            <img
              src="https://i.postimg.cc/8zTwpFPD/Screenshot-2025-03-14-020908-1.webp"
              alt="Captain Alvarado's Handyman"
              className="fancy-brand-logo"
              height="40"
              width="40"
            />
            <div className="fancy-text-group">
              <h1 className="fancy-brand-title">Captain Alvarado's Handyman</h1>
              <h2 className="fancy-brand-subtitle">
                Reliable, Affordable, and Professional Handyman Services
              </h2>
            </div>
          </div>
        </div>

        {/* 2) NAVIGATION COLUMN */}
        <div className="footer-col footer-section nav-col">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/locations">Locations</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* 3) SERVICES COLUMN */}
        <div className="footer-col footer-section services-col">
          <h3>Our Services</h3>
          <ul>
            <li><a href="/services/home-repairs">Home Repairs</a></li>
            <li><a href="/services/plumbing">Plumbing</a></li>
            <li><a href="/services/painting">Painting</a></li>
            <li><a href="/services/moving">Moving Assistance</a></li>
            <li><a href="/services/clean-outs">Clean-Out Services</a></li>
          </ul>
        </div>

        {/* 4) GET IN TOUCH COLUMN */}
        <div className="footer-col footer-section contact-col">
          <h3>Get In Touch</h3>
          <ul>
                <li><a href="/locations/san-luis-obispo">San Luis Obispo</a></li>
                <li><a href="/locations/paso-robles">Paso Robles</a></li>
                <li><a href="/locations/atascadero">Atascadero</a></li>
                <li><a href="/locations/grover-beach">Grover Beach</a></li>
                <li><a href="/locations/nacimiento-lake">Nacimiento Lake</a></li>
                <li><a href="/locations/arroyo-grande">Arroyo Grande</a></li>
                <li><a href="/locations/morro-bay">Morro Bay</a></li>
                <li><a href="/locations/los-osos">Los Osos</a></li>
                <li><a href="/locations/pismo-beach">Pismo Beach</a></li>
                <li><a href="/locations/cayucos">Cayucos</a></li>


            <li>
              <strong>Phone: </strong>
              <a href="tel:+18056351774">&nbsp;+1-805-635-1774</a>
            </li>
            <li>
              <strong>Email: </strong>
              <a href="mailto:elgatofrmcuba81@gmail.com">
                &nbsp;Send Email Here!
              </a>
            </li>
            <li>
              <strong>Hours:&nbsp; </strong>
            </li>
            <li>
              08:00 AM - 06:00 PM
            </li>
            <li>
              Monday - Saturday
            </li>
          </ul>
          <p className="book-appointment-p">
            <a href="/contact" className="book-appointment-link">
              Contact Us
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Captain Alvarado's Handyman. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
        </ul>
        <p className="footer-credit">Website by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
