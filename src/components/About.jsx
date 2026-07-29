import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import TiltCard from "./TiltCard";

const About = () => {
  const services = [
    "Social Media Ghostwriting (LinkedIn & X)",
    "Product Launch & Product Hunt Campaigns",
    "Technical Copywriting & DevTools Docs",
    "Newsletter Strategy & Editorial Systems",
    "Founder Branding & Narrative Positioning",
  ];

  return (
    <section className="about section" id="about">
      <FadeInSection>
        <div className="about-grid">
          <TiltCard className="portrait">
            <div className="portrait-scene">
              <div className="portrait-halo"></div>
              <img
                src="/assets/rehana_pfp.jpg"
                alt="Rehana Rahman"
                className="portrait-img"
              />
              <span className="portrait-bg-text">RR</span>
            </div>
            <div className="portrait-sticker">
              1M+
              <small>
                organic<br />impressions
              </small>
            </div>
          </TiltCard>

          <div className="about-copy">
            <span className="kicker">01 / About me</span>
            <h2>
              Part strategist.
              <br />
              Part storyteller.
              <br />
              <em>Fully online.</em>
            </h2>

            <p className="about-lede">
              I’m Rehana, a freelance content strategist and copywriter working with founders across AI, SaaS, Web3, fintech, and devtools. I manage socials and build content engines so builders can focus entirely on building.
            </p>

            <p className="about-body">
              What sets my work apart is technical depth: I write code in Python and C (like building a custom 3D raycaster and a lightweight SQLite engine). Because I speak the language of developers, I translate complex architectures into clear, compelling messaging that resonates with technical buyers.
            </p>

            <p className="about-body">
              When I'm not crafting content strategies or ghostwriting, I run a weekly tech newsletter, write terminal scripts, watch anime, and read literary fiction.
            </p>

            <div className="capabilities-tags">
              <span className="tags-label">Capabilities & Services:</span>
              <div className="tags-list">
                {services.map((service, i) => (
                  <span className="tag-pill" key={i}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="stats">
              <div>
                <strong>1M+</strong>
                <span>organic impressions</span>
              </div>
              <div>
                <strong>1.97K+</strong>
                <span>tech followers</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>industries served</span>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

export default About;
