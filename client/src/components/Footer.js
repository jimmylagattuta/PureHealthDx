import React from 'react';
import './Footer.css'; // Create a separate CSS file for the footer styles

function Footer() {
  return (
    <footer>
      <div className="contact-info">
        <a href="mailto:mebcb@yahoo.com" className="contact-button email-button">
          Email Us
        </a>
        <a href="tel:+13233333471" className="contact-button phone-button">
          Call Long Beach, CA
        </a>
        <a href="tel:+13233333471" className="contact-button phone-button">
          Call Griffin, GA
        </a>
      </div>

      <div className="footer-info">
        <p className="copyright">© {new Date().getFullYear()} BCB Carts. All rights reserved.</p>
        <div className="divider"></div>
        <p className="powered-by">Powered by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default Footer;
