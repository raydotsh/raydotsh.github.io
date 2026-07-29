import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const Experience = () => {
  return (
    <section className="services section" id="experience">
      <FadeInSection>
        <div className="services-container">
          <div className="services-intro">
            <span className="kicker">03 / Experience</span>
            <h2>
              A full content team,
              <br />
              <em>without the overhead.</em>
            </h2>
            <p>
              Plug me in where you need me. I offer focused strategy, technical ghostwriting, and editorial systems built around your stage of growth.
            </p>
            <a className="text-link" href="mailto:rehanarahman004@gmail.com" style={{ color: "#d8ff45" }}>
              Start a project <span>↗</span>
            </a>
          </div>

          <div className="services-content">
            <JobList />
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

export default Experience;
