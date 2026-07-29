import React from "react";
import "../styles/Intro.css";
import HeroCanvas from "./HeroCanvas";

const Intro = () => {
  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="hero-noise"></div>

      <div className="hero-copy reveal visible">
        <div className="eyebrow">
          <span className="status-dot"></span> Available for select projects
        </div>

        <h1>
          Your brand has<br />
          <span className="script-accent">something to say.</span>
        </h1>

        <p className="hero-lede">
          I turn ideas into social-first stories that build communities, spark conversation, and move the metrics that matter.
        </p>

        <div className="hero-actions">
          <a className="pill pill-dark" href="#experience">
            See my work <span>↓</span>
          </a>
          <a className="text-link" href="mailto:rehanarahman004@gmail.com">
            Let’s work together <span>↗</span>
          </a>
        </div>
      </div>

      <div className="hero-proof reveal visible">
        <div className="avatar-stack" aria-hidden="true">
          <span className="avatar avatar-a">RR</span>
          <span className="avatar avatar-b">1M</span>
          <span className="avatar avatar-c">8%</span>
        </div>
        <p>
          <strong>Trusted by founders & teams</strong>
          <br />
          across AI, SaaS, Web3 & devtools.
        </p>
      </div>

      <div className="scroll-note">
        Scroll to explore <span>↓</span>
      </div>
    </section>
  );
};

export default Intro;
