// src/sections/LocationsSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { locationsData } from "../data";
import "./LocationsSection.css";

function LocationsSection({ showButton = true }) {
  const locations = Object.entries(locationsData).map(([key, location]) => ({
    ...location,
    id: key,
  }));

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const lazyDivs = document.querySelectorAll(".lazy-bg");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const bg = el.getAttribute("data-bg");
            if (bg) {
              el.style.backgroundImage = `url(${bg})`;
              el.classList.remove("lazy-bg");
              obs.unobserve(el);
            }
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    lazyDivs.forEach((div) => observer.observe(div));
    return () => observer.disconnect();
  }, [locations]);

  const openMap = (address, e) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address.replace(/ /g, "+")}`,
      "_blank"
    );
  };

  const callPhone = (phone, e) => {
    e.stopPropagation();
    window.location.href = `tel:${phone.replace(/[^0-9]/g, "")}`;
  };

  const getBackgroundImage = (location) => {
    return isDesktop && location.desktopImage
      ? location.desktopImage
      : location.image || location.heroImage;
  };

  return (
    <section className="locations-section">
      <div className="hero-content-title-locations">
        <div className="line-locations"></div>
        <h1 className="company-name-locations">OUR LOCATIONS</h1>
        <div className="line-locations"></div>
      </div>
      <div className="locations-grid">
        {locations.map((location, index) => (
          <Link
            key={location.id}
            to={`/locations/${location.id}`}
            className="location-card-link"
          >
            <div className={`location-card ${index % 2 !== 0 ? "reverse" : ""}`}>
              <div
                className="location-image lazy-bg"
                data-bg={getBackgroundImage(location)}
              ></div>
              <div className="location-info">
                <h2 className="location-city">{location.name}</h2>
                <p className="location-address">
                  {location.address ? (
                    <span
                      onClick={(e) => openMap(location.address, e)}
                      className="map-link"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="https://i.postimg.cc/HLxtkzZm/map-pin-1-1.webp"
                        alt="Map icon"
                        className="map-icon"
                        height="16"
                        width="16"
                      />
                      {location.address}
                    </span>
                  ) : (
                    "Address coming soon"
                  )}
                </p>
                {location.phone && (
                  <p className="location-address">
                    <strong>Phone:</strong>
                    <span
                      onClick={(e) => callPhone(location.phone, e)}
                      className="phone-link"
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    >
                      {location.phone}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showButton && (
        <div
          className="button-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Link to="/locations" className="location-section-button">
            View All Locations
          </Link>
        </div>
      )}
    </section>
  );
}

export default LocationsSection;
