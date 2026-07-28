import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import TerminalIcon from "@mui/icons-material/Terminal";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const About = () => {
  const bioOne = (
    <p>
      I am a freelance content strategist and copywriter working with founders across AI, SaaS, Web3, fintech, and devtools. I manage socials and build content engines so builders can focus entirely on building.
    </p>
  );

  const bioTwo = (
    <p>
      What sets my work apart is technical depth: I actually write code in Python and C (like building a custom 3D raycaster and a lightweight SQLite engine). Because I speak the language of developers, I translate complex architectures into clear, compelling messaging that resonates with technical buyers.
    </p>
  );

  const bioThree = (
    <p>
      When I'm not crafting content strategies or ghostwriting, I run a weekly tech newsletter, write terminal scripts, watch anime, and read literary fiction.
    </p>
  );

  const services = [
    "Social Media Ghostwriting (LinkedIn & X)",
    "Product Launch & Product Hunt Campaigns",
    "Technical Copywriting & DevTools Docs",
    "Newsletter Strategy & Editorial Systems",
    "Founder Branding & Narrative Positioning",
  ];

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">/ about me</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {bioOne}
            {bioTwo}
            
            <div className="about-skills-box">
              <span className="skills-heading">Core Capabilities & Services:</span>
              <ul className="tech-stack">
                {services.map((skillItem, i) => (
                  <FadeInSection key={i} delay={(i + 1) * 80 + "ms"}>
                    <li>
                      <CheckCircleOutlinedIcon className="skill-check-icon" sx={{ fontSize: 16 }} />
                      {skillItem}
                    </li>
                  </FadeInSection>
                ))}
              </ul>
            </div>

            {bioThree}
          </div>

          <div className="about-profile-card">
            <div className="profile-card-inner">
              <img alt="Rehana Rahman" src="/assets/rehana_pfp.jpg" className="about-avatar-img" />
              <div className="profile-card-details">
                <div className="profile-name">Rehana Rahman</div>
                <div className="profile-handle">@raydotsh</div>
                
                <div className="profile-meta">
                  <span className="meta-item"><LocationOnIcon sx={{ fontSize: 15 }} /> Bengaluru, India</span>
                  <span className="meta-item"><TerminalIcon sx={{ fontSize: 15 }} /> Termux & Neovim user</span>
                </div>

                <div className="profile-stats-row">
                  <div className="stat-pill">
                    <span className="stat-num">1M+</span>
                    <span className="stat-lbl">Impressions</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-num">1.97K+</span>
                    <span className="stat-lbl">Followers</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-num">0%</span>
                    <span className="stat-lbl">AI Voice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
