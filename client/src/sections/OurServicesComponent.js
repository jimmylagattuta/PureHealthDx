import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurServicesComponent.css";

function OurServicesComponent() {
  const navigate = useNavigate();

  const services = [
    {
      title: "On-Page SEO",
      description: "Optimize your website content and meta tags for improved search engine rankings.",
      link: "/services/on-page-seo",
      image: "https://i.postimg.cc/MGjWdtQZ/i-Stock-1076326738-1-1.webp",
      color: "#E3F2FD" // Light Blue
    },
    {
      title: "Technical SEO",
      description: "Improve site speed, mobile responsiveness, and overall performance.",
      link: "/services/technical-seo",
      image: "https://i.postimg.cc/DwSgpbyy/i-Stock-1076326738-2-1-1.webp",
      color: "#FCE4EC" // Light Pink
    },
    {
      title: "Content SEO",
      description: "Develop and optimize content that resonates with your audience and search engines.",
      link: "/services/content-seo",
      image: "https://i.postimg.cc/DwSgpbyy/i-Stock-1076326738-2-1-1.webp",
      color: "#E8F5E9" // Light Green
    },
    {
      title: "Local SEO",
      description: "Boost your local visibility with targeted strategies that drive nearby traffic.",
      link: "/services/local-seo",
      image: "https://i.postimg.cc/MGjWdtQZ/i-Stock-1076326738-1-1.webp",
      color: "#FFF3E0" // Light Orange
    },
    {
      title: "Link Building",
      description: "Enhance your site’s authority with high-quality backlinks from trusted sources.",
      link: "/services/link-building",
      image: "https://i.postimg.cc/MGjWdtQZ/i-Stock-1076326738-1-1.webp",
      color: "#EDE7F6" // Light Purple
    },
    {
      title: "Website Development",
      description: "Build responsive, SEO-friendly websites that represent your brand.",
      link: "/services/web-development",
      image: "https://i.postimg.cc/65rkYgqp/i-Stock-1961517902-1-1.webp", // Same as Web App Development
      color: "#FFEBEE" // Light Red
    },
    {
      title: "Web App Development",
      description: "Develop robust web applications tailored to your business needs.",
      link: "/services/web-app",
      image: "https://i.postimg.cc/65rkYgqp/i-Stock-1961517902-1-1.webp",
      color: "#F1F8E9" // Light Yellow-Green
    },
    {
      title: "Mobile App Development",
      description: "Create intuitive mobile applications for iOS and Android platforms.",
      link: "/services/mobile-app",
      image: "https://i.postimg.cc/tRMQsWf9/i-Stock-1961529307-1-2.webp",
      color: "#FBE9E7" // Soft Coral
    },
    {
      title: "Apple Watch App Development",
      description: "Extend your ecosystem with sleek, functional apps for Apple Watch.",
      link: "/services/watch-app",
      image: "https://i.postimg.cc/NfTKb1Wx/i-Stock-2055845781-1.webp", // Corrected Apple Watch Image
      color: "#E0F7FA" // Light Cyan
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

      {/* Service Cards */}
      <div className="services-cards-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => navigate(service.link)}
            style={{ backgroundColor: service.color }}
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
      </div>
    </section>
  );
}

export default OurServicesComponent;
