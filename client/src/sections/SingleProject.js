import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { projectsData } from "../data";
import "./SingleProject.css";

const SingleProject = ({ project }) => {
  // Determine if the screen width is 769px or wider.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use desktop image if available and on desktop; else fallback to hero image.
  const projectImage = isDesktop && project.desktopImage ? project.desktopImage : project.heroImage;

  // Build the rich snippet JSON‑LD object for this project.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.name,
    "description": project.description,
    "url": project.website,
    "image": projectImage,
    "creator": {
      "@type": "Organization",
      "name": "LightningSEO.dev",
      "url": "https://lightningseo.dev",
      "logo": "https://i.postimg.cc/QtwR2GW9/i-Stock-1502494966-1.webp"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>
      <div className="sp-project-card">
        {/* Project Card Row */}
        <div className="sp-project-cardrow">
          <div
            className="sp-project-image"
            style={{ backgroundImage: `url(${projectImage})` }}
          >
            <h2 className="sp-project-name">{project.name}</h2>
          </div>
          <div className="sp-project-info">
            <p className="sp-project-description">{project.description}</p>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="sp-project-details">
          <h3>About {project.name}</h3>
          <p>{project.description}</p>
          {project.website && (
            <p>
              <strong>Visit Website: </strong>
              <a href={project.website} target="_blank" rel="noopener noreferrer">
                {project.website}
              </a>
            </p>
          )}
        </div>

        {/* Services List Section (if applicable) */}
        {project.servicesOffered && (
          <div className="sp-services-section">
            <h3>Services Provided</h3>
            <ul className="sp-services-list">
              {project.servicesOffered.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="sp-back-button">
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
