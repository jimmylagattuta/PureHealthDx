import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesData } from '../data';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();
  const location = useLocation();
  const hoverTimeout = useRef(null);

  // Toggle entire mobile menu
  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      if (isOpen) setSubMenuOpen(false);
    }
  };

  // Navigate to a route & close all menus
  const handleNavItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setSubMenuOpen(false);
  };

  // Scroll to Contact Form if on the same page, otherwise navigate
  const handleContactClick = () => {
    const targetHash = "#contactForm";
    if (location.pathname.startsWith("/contact")) {
      const element = document.getElementById("contactForm");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/contact${targetHash}`);
    }
    setIsOpen(false);
    setSubMenuOpen(false);
  };

  // Handle Services submenu for mobile (click to toggle)
  const handleServicesClick = () => {
    if (isMobile) setSubMenuOpen(!subMenuOpen);
  };

  // Handle Services submenu for desktop (hover to open)
  const handleServicesEnter = () => {
    if (!isMobile) {
      clearTimeout(hoverTimeout.current);
      setSubMenuOpen(true);
    }
  };

  const handleServicesLeave = () => {
    if (!isMobile) {
      hoverTimeout.current = setTimeout(() => setSubMenuOpen(false), 300);
    }
  };

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 769;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsOpen(false);
        setSubMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand: Logo + Company Name */}
        <div className="navbar-brand">
          <div className="navbar-logo" onClick={() => handleNavItemClick('/')}>
            <img
              src="https://i.postimg.cc/QtwR2GW9/i-Stock-1502494966-1.webp"
              alt="Lightning SEO Logo"
              loading="eager"
              height="65"
              width="85"
            />
          </div>
          <div className="company-name-desktop" onClick={() => handleNavItemClick('/')}>
            LightningSEO.dev
          </div>
        </div>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
          </div>
        )}

        {/* Navigation Links */}
        <ul className={`nav-menu ${isOpen || !isMobile ? 'active' : ''}`}>
          <li
            className="nav-item services-link"
            onClick={handleServicesClick}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            Services
            {subMenuOpen && (
              <ul
                className="sub-nav-menu show"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                {Object.entries(servicesData).map(([key, service]) => (
                  <li
                    key={key}
                    className="sub-nav-item"
                    onClick={() => handleNavItemClick(`/services/${key}`)}
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item pricing-link" onClick={() => handleNavItemClick('/pricing')}>
            Pricing
          </li>

          <li className="nav-item reviews-link" onClick={() => handleNavItemClick('/reviews')}>
            Reviews
          </li>

          {/* Removed Locations Link */}
          <li className="nav-item faq-link" onClick={() => handleNavItemClick('/faq')}>
            FAQ
          </li>

          <li className="nav-item aboutus-link" onClick={() => handleNavItemClick('/about-us')}>
            About Us
          </li>

          <li className="nav-item book-appointment" onClick={handleContactClick}>
            Free SEO Audit
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
