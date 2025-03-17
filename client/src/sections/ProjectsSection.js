import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data";
import "./ProjectsSection.css";

function ProjectsSection({ showButton = true }) {
  // Convert projectsData (an object) to an array with keys.
  const projects = Object.entries(projectsData).map(([key, project]) => ({
    ...project,
    id: key,
  }));

  // Determine if the screen width is 769 or greater.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to determine the background image based on screen width and available data.
  const getBackgroundImage = (project) => {
    return isDesktop && project.desktopImage
      ? project.desktopImage
      : project.heroImage;
  };

  return (
    <section className="projects-section">
      <div className="hero-content-title">
        <div className="line-projects"></div>
        <h1 className="company-name-projects">OUR PROJECTS</h1>
        <div className="line-projects"></div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-card-link">
            <div className={`project-card ${index % 2 !== 0 ? "reverse" : ""}`}>
              <div
                className="project-image"
                style={{ backgroundImage: `url(${getBackgroundImage(project)})` }}
              ></div>
              <div className="project-info">
                <h2 className="project-title">{project.name}</h2>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showButton && (
        <div className="button-container">
          <Link to="/projects" className="project-section-button">
            View All Projects
          </Link>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
