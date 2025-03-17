import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { projectsData } from "../data"; // Updated data for projects
import ProjectsSection from "../sections/ProjectsSection"; // Component to display a grid of project cards
import SingleProject from "../sections/SingleProject"; // Component to display a single project's details
import Contact from "./main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./ProjectsPage.css";

function ProjectsPage() {
  const { projectId } = useParams();
  const [submitted, setSubmitted] = useState(false);

  // Determine whether we're showing a single project or all projects.
  const isSingleProject = Boolean(projectId);

  // Build the rich snippet for all projects if on the list page.
  let projectsRichSnippet = null;
  if (!isSingleProject) {
    const projectsArray = Object.entries(projectsData).map(([key, project]) => {
      return {
        "@type": "CreativeWork",
        "name": project.name,
        "description": project.description,
        "url": project.website,  // Use the project website URL
        "image": project.desktopImage || project.heroImage
      };
    });
    projectsRichSnippet = {
      "@context": "https://schema.org",
      "@graph": projectsArray
    };
  }

  // Determine content: single project or projects grid.
  let projectContent = null;
  if (projectId) {
    const project = projectsData[projectId];
    if (project) {
      projectContent = <SingleProject project={project} />;
    } else {
      projectContent = (
        <div className="project-detail not-found">
          <h2>Project Not Found</h2>
          <p>Please select a valid project.</p>
        </div>
      );
    }
  } else {
    projectContent = <ProjectsSection showButton={false} />;
  }

  // Optional: scroll into view if URL has a hash (e.g. #contactForm).
  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      const element = document.getElementById("contactForm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      {/* Inject rich snippet JSON‑LD for all projects when not on an individual project page */}
      {!isSingleProject && projectsRichSnippet && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(projectsRichSnippet)}
          </script>
        </Helmet>
      )}
      <div className="projects-page-container">
        <div className="contact-header">
          <p className="small-heading">LightningSEO.dev Projects</p>
          <h2 className="main-heading">Explore Our Work</h2>
          <p className="sub-text">
            Discover the innovative websites and applications we’ve developed for our clients. Our projects showcase our expertise in digital marketing, SEO, and cutting-edge web and app development.
          </p>
        </div>
        {projectContent}
      </div>
      {/* Contact form wrapped with an id so the page can scroll to it */}
      <div id="contactForm">
        <Contact />
      </div>
      <FooterComponent />
    </div>
  );
}

export default ProjectsPage;
