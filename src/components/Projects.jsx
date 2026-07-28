import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

const spotlightProjects = {
  pycaster: {
    title: "pycaster",
    desc: "A Wolfenstein 3D style raycasting rendering engine built from scratch in Python, implementing custom texture mapping, projection math, and real-time rendering loop.",
    techStack: "Python / Computer Graphics",
    link: "https://github.com/raydotsh/pycaster",
    image: "/assets/pycaster.png",
  }
};

const projects = {
  nottoSQL: {
    title: "nottoSQL",
    desc: "A light SQLite database built from scratch in C, implementing B-trees, custom query execution, page serialization, and file storage structures.",
    techStack: "C / Database Architecture",
    link: "https://github.com/raydotsh/nottoSQL",
  },
  pyshell: {
    title: "pyshell",
    desc: "A terminal shell built from scratch in Python, implementing core shell functionalities, process management, and custom command scripting.",
    techStack: "Python / Operating Systems",
    link: "https://github.com/raydotsh/pyshell",
  },
  pitsoferrors: {
    title: "PitsOfErrors",
    desc: "A mini terminal game built directly in shell scripting, implementing game state logic, score counters, and interactive CLI layout.",
    techStack: "Shell / Bash Scripting",
    link: "https://github.com/raydotsh/PitsOfErrors",
  }
};

const Projects = () => {
  return (
    <div id="projects">
      <div className="section-header">
        <span className="section-title">/ software & projects</span>
        <a
          href="https://github.com/raydotsh"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all on GitHub
        </a>
      </div>
      
      <FadeInSection delay="200ms">
        <div className="projects-description">
          Building real software engineering projects gives me first-hand insight into developer workflows and SaaS architectures, making my technical copywriting sharp and credible.
        </div>
      </FadeInSection>

      <div className="spotlight-projects-desktop">
        {Object.keys(spotlightProjects).map((key, i) => (
          <div className="spotlight-card" key={i}>
            <a
              href={spotlightProjects[key]["link"]}
              target="_blank"
              rel="noopener noreferrer"
              className="spotlight-image-link"
            >
              <img
                className="spotlight-image"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
            </a>
            <div className="spotlight-info">
              <a
                href={spotlightProjects[key]["link"]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 className="spotlight-title">{spotlightProjects[key]["title"]}</h3>
              </a>
              <p className="spotlight-desc">{spotlightProjects[key]["desc"]}</p>
              <div className="spotlight-tech">{spotlightProjects[key]["techStack"]}</div>
              <ExternalLinks
                githubLink={spotlightProjects[key]["link"]}
                openLink={spotlightProjects[key]["open"]}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="spotlight-projects-mobile">
        {Object.keys(spotlightProjects).map((key, i) => (
          <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
            <div className="projects-card">
              <div className="card-header">
                <div className="folder-icon">
                  <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
                </div>
                <ExternalLinks
                  githubLink={spotlightProjects[key]["link"]}
                  openLink={spotlightProjects[key]["open"]}
                />
              </div>

              <a
                href={
                  spotlightProjects[key]["open"] ||
                  spotlightProjects[key]["link"]
                }
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                <div className="card-title">
                  {spotlightProjects[key]["title"]}
                </div>
                <div className="spotlight-mobile-image">
                  <img src={spotlightProjects[key]["image"]} alt={key} />
                </div>
              </a>
              <div className="card-desc">{spotlightProjects[key]["desc"]}</div>
              <div className="card-tech">{spotlightProjects[key]["techStack"]}</div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <div className="project-container">
        <ul className="projects-grid">
          {Object.keys(projects).map((key, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks
                    githubLink={projects[key]["link"]}
                    openLink={projects[key]["open"]}
                  />
                </div>

                <div className="card-title">{projects[key]["title"] || key}</div>
                <div className="card-desc">{projects[key]["desc"]}</div>
                <div className="card-tech">{projects[key]["techStack"]}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
