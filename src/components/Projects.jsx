import React from "react";
import "../styles/Projects.css";
import FadeInSection from "./FadeInSection";
import TiltCard from "./TiltCard";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const spotlightProjects = [
  {
    number: "01",
    title: "pycaster",
    desc: "A Wolfenstein 3D style raycasting rendering engine built from scratch in Python, implementing custom texture mapping, projection math, and real-time rendering loop.",
    techStack: "Python / Computer Graphics",
    link: "https://github.com/raydotsh/pycaster",
    image: "/assets/pycaster.png",
    metric: "3D Engine",
    metricLabel: "Custom Math",
    artClass: "art-luma",
  },
  {
    number: "02",
    title: "nottoSQL",
    desc: "A light SQLite database built from scratch in C, implementing B-trees, custom query execution, page serialization, and file storage structures.",
    techStack: "C / Database Architecture",
    link: "https://github.com/raydotsh/nottoSQL",
    metric: "B-Tree DB",
    metricLabel: "Built in C",
    artClass: "art-oryx",
  },
  {
    number: "03",
    title: "pyshell",
    desc: "A terminal shell built from scratch in Python, implementing core shell functionalities, process management, and custom command scripting.",
    techStack: "Python / Operating Systems",
    link: "https://github.com/raydotsh/pyshell",
    metric: "CLI Shell",
    metricLabel: "Custom Execution",
    artClass: "art-sola",
  },
];

const Projects = () => {
  return (
    <section className="work section" id="projects">
      <FadeInSection>
        <div className="section-heading">
          <div>
            <span className="kicker">04 / Selected Projects</span>
            <h2>
              Software engineering &<br />
              <em>graphics engines.</em>
            </h2>
          </div>
          <p>
            Building real software engineering projects gives me first-hand insight into developer workflows and SaaS architectures, making my technical copywriting sharp and credible.
          </p>
        </div>

        <div className="work-grid">
          {spotlightProjects.map((project, index) => (
            <TiltCard
              key={index}
              className={`project ${index === 0 ? "project-large" : ""}`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-wrapper"
              >
                <div className={`project-art ${project.artClass}`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-custom-img" />
                  ) : (
                    <div className="project-code-art">
                      <span>{project.title}</span>
                      <b>{project.techStack}</b>
                    </div>
                  )}
                  <span className="project-number">{project.number}</span>
                </div>

                <div className="project-meta">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project-tech-badge">{project.techStack}</div>
                  </div>
                  <div className="metric">
                    <strong>{project.metric}</strong>
                    <span>{project.metricLabel}</span>
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

export default Projects;
