import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { projectsData } from "../data";
import "./SingleProject.css";

const SingleProject = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId];

  if (!project) {
    return <div className="sp-error">Project not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{project.name} - Project Details</title>
      </Helmet>

      <div className="sp-container">
        {/* Hero Image & Title */}
        <div className="sp-hero" style={{ backgroundImage: `url(${project.heroImage})` }}>
          <h1 className="sp-title">{project.name}</h1>
        </div>

        {/* Project Description */}
        <div className="sp-content">
          <p className="sp-description">{project.description}</p>
        </div>

        {/* Devices Section (Mobile-First) */}
        <div className="sp-devices">
          <div className="sp-device">
            <div className="sp-screen sp-desktop">
              <div className="sp-stand"></div>
              <img src={project.desktopImage} alt="Desktop View" />
            </div>
            <p className="sp-device-title sp-desktop-title">💻 DESKTOP VIEW</p>
          </div>

          <div className="sp-device">
            <div className="sp-screen sp-tablet">
              <div className="sp-home-button"></div>
              <img src={project.tabletImage} alt="Tablet View" />
              <div className="sp-side-buttons"></div>
            </div>
            <p className="sp-device-title sp-tablet-title">📱 TABLET VIEW</p>
          </div>

          <div className="sp-device">
            <div className="sp-screen sp-mobile">
              <div className="sp-home-button"></div>
              <img src={project.mobileImage} alt="Mobile View" />
              <div className="sp-side-buttons"></div>
            </div>
            <p className="sp-device-title sp-mobile-title">📲 MOBILE VIEW</p>
          </div>
        </div>

        {/* Conditionally show mailto link for SubtitleTsunami, otherwise normal link */}
        {project.url && (
          <div className="sp-website-container">
            {projectId === "subtitle-tsunami" ? (
              <a
                href="mailto:jimmy.lagattuta@gmail.com?subject=Credentials%20Request%20for%20SubtitleTsunami"
                className="sp-website-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email for Credentials to Try This App.
              </a>
            ) : (
              <a
                href={project.url}
                className="sp-website-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website: {project.name}
              </a>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="sp-back">
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
