import React from "react";
import { Link } from "react-router-dom";
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
import { locationsData } from "../data";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer-container">
      {/* Top area with 4 columns on desktop/tablet */}
      <Link to="/">
        <img
          loading="lazy"
          src="https://i.postimg.cc/FsjJMwWQ/footer-logo.webp"
          alt="Pure Health & Wellness"
          className="footer-logo"
          width="248"
          height="56"
        />
      </Link>


      <p className="footer-tagline">
        Helping you get rid of excess weight, erectile dysfunction, and low energy levels.
      </p>

      <div className="footer-socials">



        {/* 2) NAVIGATION COLUMN */}
        <div className="footer-col footer-section nav-col">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us/">About Us</a></li>
            <li><a href="/book-appointment/">Book Appointment</a></li>
            <li><a href="/contact/">Contact Us</a></li>
          </ul>
        </div>

        {/* 3) SERVICES COLUMN */}
        <div className="footer-col footer-section services-col">
          <h3>Our Services</h3>
          <ul>
            <li><a href="/services/testosterone-replacement-therapy/">Testosterone Replacement Therapy</a></li>
            <li><a href="/services/erectile-dysfunction-treatment/">Erectile Dysfunction Treatment</a></li>
            <li><a href="/services/hormone-therapy-for-women/">HRT Treatment for Women</a></li>
            <li><a href="/services/benefits-of-peptide-therapy/">Peptide Therapy</a></li>
            <li><a href="/services/platelet-rich-plasma-treatment/">Platelet Rich Plasma Therapy</a></li>
            <li><a href="/services/semaglutide-weight-loss-program/">Semaglutide Weight Loss Program</a></li>

          </ul>
        </div>

       {/* 4) LOCATIONS */}
        <div className="footer-col footer-section locations-col">
          <h3>Our Locations</h3>
          <ul>
            {Object.entries(locationsData).map(([slug, loc]) => (
              <li key={slug}>
                <Link to={`/locations/${slug}/`}>{loc.name}</Link>
              </li>
            ))}
          </ul>
        </div>


        {/* 4) GET IN TOUCH COLUMN */}
        <div className="footer-col footer-section contact-col">
          <h3>Get In Touch</h3>
          <ul>
            <li>
              <strong>Email: </strong>
              <a href="mailto:info@purehealthdx.com">
                &nbsp;info@purehealthdx.com
              </a>
            </li>

          </ul>
          <p className="book-appointment-p">
            <a href="/contact/" className="book-appointment-link">
              Contact Us
            </a>
          </p>


        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Pure Health & Wellness. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions/">Terms &amp; Conditions</a></li>
        </ul>
        <p className="footer-credit">Website by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
