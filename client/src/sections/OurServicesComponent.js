import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurServicesComponent.css";

function OurServicesComponent() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Home Repairs",
      description: "Reliable home repair services to keep your property in top shape. We fix everything from drywall to small electrical issues.",
      link: "/services/home-repairs",
      image: "https://i.postimg.cc/Njq22z27/i-Stock-586932394-4-1-1.webp",
    },
    {
      title: "Plumbing Services",
      description: "Expert plumbing solutions for minor leaks, faucet installations, drain unclogging, and general plumbing repairs.",
      link: "/services/plumbing",
      image: "https://i.postimg.cc/C1qzKCM6/i-Stock-1485512746-1-1.webp",
    },
    {
      title: "Painting Services",
      description: "Interior and exterior painting services to refresh your home with a clean, professional finish.",
      link: "/services/painting",
      image: "https://i.postimg.cc/SsFmDBqD/i-Stock-2176183036-1-1-1-1.webp",
    },
    {
      title: "Moving Assistance",
      description: "Reliable moving help, including furniture relocation, packing assistance, and heavy lifting.",
      link: "/services/moving",
      image: "https://i.postimg.cc/QxLnVjm6/i-Stock-2172319807-1.webp",
    },
    {
      title: "Clean-Out Services",
      description: "Fast and efficient clean-out services for garages, attics, rental properties, and more.",
      link: "/services/clean-outs",
      image: "https://i.postimg.cc/B6S4rxLK/i-Stock-1652006029-1.webp",
    }
  ];

  return (
    <section className="our-services-section">
      {/* Header and Slogan */}
      <div className="hero-content-title">
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
        <h1 style={{ color: "black" }} className="company-name">OUR SERVICES</h1>
        <div style={{ backgroundColor: "rgb(37, 54, 53)" }} className="line"></div>
      </div>

      <p className="our-services-slogan">Quality Work, Honest Service, Affordable Prices.</p>

      {/* Cards */}
      {services.map((service, index) => (
        <div
          key={index}
          className="service-card"
          onClick={() => navigate(service.link)}
        >
          {/* FRONT (Desktop Default) */}
          <div className="service-front">
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h2 className="service-title">{service.title}</h2>
            <p className="service-link">Learn More About {service.title}</p>
          </div>

          {/* BACK (Desktop Hover, Mobile Default) */}
          <div className="service-back">
            <img
              src={service.image}
              alt={service.title}
              className="service-image-back"
            />
            <p className="service-description">{service.description}</p>
            <p className="service-link">Learn More About {service.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default OurServicesComponent;
