import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesData, locationsData } from '../data'; // Remove 'projectsData' if unused

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesSubMenuOpen, setServicesSubMenuOpen] = useState(false);
  const [locationsSubMenuOpen, setLocationsSubMenuOpen] = useState(false)
  const locationsHoverTimeout = useRef(null)
  const [projectsSubMenuOpen, setProjectsSubMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesHoverTimeout = useRef(null);
  const projectsHoverTimeout = useRef(null);
  

  // Toggle entire mobile menu
  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setServicesSubMenuOpen(false);
        setProjectsSubMenuOpen(false);
      }
    }
  };

  // Navigate to a route & close all menus
  const handleNavItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setServicesSubMenuOpen(false);
    setProjectsSubMenuOpen(false);
    setLocationsSubMenuOpen(false);
  };

  // Direct to external Patient Portal
  const handleNavItemClickPortal = (url) => {
    window.location.href = url;
    setIsOpen(false);
    setServicesSubMenuOpen(false);
    setProjectsSubMenuOpen(false);
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
    setServicesSubMenuOpen(false);
    setProjectsSubMenuOpen(false);
  };

  const handleBookAppointmentClick = () => {
    const targetHash = "#contactForm";
    if (location.pathname.startsWith("/contact")) {
      const element = document.getElementById("contactForm");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/contact${targetHash}`);
    }
    setIsOpen(false);
    setServicesSubMenuOpen(false);
    setProjectsSubMenuOpen(false);
  };

  // Services submenu handlers
  const handleServicesClick = () => {
    if (isMobile) setServicesSubMenuOpen(!servicesSubMenuOpen);
  };

  const handleServicesEnter = () => {
    if (!isMobile) {
      clearTimeout(servicesHoverTimeout.current);
      setServicesSubMenuOpen(true);
    }
  };

  const handleServicesLeave = () => {
    if (!isMobile) {
      servicesHoverTimeout.current = setTimeout(
        () => setServicesSubMenuOpen(false),
        300
      );
    }
  };

  // Projects submenu handlers (if needed)
  const handleProjectsClick = () => {
    if (isMobile) setProjectsSubMenuOpen(!projectsSubMenuOpen);
  };

  const handleProjectsEnter = () => {
    if (!isMobile) {
      clearTimeout(projectsHoverTimeout.current);
      setProjectsSubMenuOpen(true);
    }
  };

  const handleProjectsLeave = () => {
    if (!isMobile) {
      projectsHoverTimeout.current = setTimeout(
        () => setProjectsSubMenuOpen(false),
        300
      );
    }
  };
    const handleLocationsClick = () => {
    if (isMobile) {
      setLocationsSubMenuOpen(open => !open)
    }
  }
  const handleLocationsEnter = () => {
    if (!isMobile) {
      clearTimeout(locationsHoverTimeout.current)
      setLocationsSubMenuOpen(true)
    }
  }
  const handleLocationsLeave = () => {
    if (!isMobile) {
      locationsHoverTimeout.current = setTimeout(
        () => setLocationsSubMenuOpen(false),
        300
      )
    }
  }
  // Update mobile/desktop state on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 769;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsOpen(false);
        setServicesSubMenuOpen(false);
        setProjectsSubMenuOpen(false);
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
              src="https://res.cloudinary.com/djtsuktwb/image/upload/v1742936866/nav-logo_tersen.webp"
              alt="Pure Health & Wellness Logo"
              loading="eager"
              height="50"
              width="224"
            />
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
          {/* Home (special "active-home" if path is "/") */}
          <li
            className={`nav-item pricing-link ${
              location.pathname === '/' ? 'active-home' : ''
            }`}
            onClick={() => handleNavItemClick('/')}
          >
            Home
          </li>

          {/* Services (with sub-menu) */}
          <li
            className={`nav-item services-link ${
              location.pathname.startsWith('/services') ? 'active-link' : ''
            }`}
            onClick={handleServicesClick}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            Services
            {servicesSubMenuOpen && (
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

                  {/* Locations */}
        <li
          className={`nav-item locations-link ${
            location.pathname.startsWith('/locations') ? 'active-link' : ''
          }`}
          onClick={handleLocationsClick}
          onMouseEnter={handleLocationsEnter}
          onMouseLeave={handleLocationsLeave}
        >
          Locations
          {locationsSubMenuOpen && (
            <ul
              className="sub-nav-menu show"
              onMouseEnter={handleLocationsEnter}
              onMouseLeave={handleLocationsLeave}
            >
              {Object.entries(locationsData).map(([slug, loc]) => (
                <li
                  key={slug}
                  className="sub-nav-item"
                  onClick={() => handleNavItemClick(`/locations/${slug}`)}
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          )}
        </li>

          {/* About Us */}
          <li
            className={`nav-item pricing-link ${
              location.pathname === '/about-us' ? 'active-link' : ''
            }`}
            onClick={() => handleNavItemClick('/about-us')}
          >
            About Us
          </li>

          {/* Become a Patient */}
          <li
            className={`nav-item reviews-link ${
              location.pathname === '/book-appointment' ? 'active-link' : ''
            }`}
            onClick={() => handleNavItemClick('/book-appointment')}
          >
            Become a Patient
          </li>

          {/* Patient Portal */}
          <li
            className="nav-item portal-link"
            onClick={() => handleNavItemClickPortal('https://live.vcita.com/site/ihthr8x7hs2olzrt/activity/dashboard')}
          >
            Patient Portal
          </li>

          {/* Book Appointment */}
          <li
            className="nav-item book-appointment"
            onClick={() => handleNavItemClick('/book-appointment')}
          >
            Book Appointment
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
