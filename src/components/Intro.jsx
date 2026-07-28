import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CodeIcon from "@mui/icons-material/Code";
import FadeInSection from "./FadeInSection";
import AsciiPortrait from "./AsciiPortrait";

const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-simulation">
        <AsciiPortrait />
      </div>

      <div className="intro-block">
        <div className="intro-title">
          {"hi, "}
          <span className="intro-name">
            <TypeAnimation
              sequence={["rehana"]}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          </span>
          {" here."}
          <span className="intro-cursor">|</span>
        </div>

        <div className="intro-badge-row">
          <span className="tech-tag"><CodeIcon sx={{ fontSize: 16 }} /> DevTools & AI Copywriter</span>
          <span className="tech-tag">Content Strategist</span>
          <span className="tech-tag">1M+ Organic Reach</span>
        </div>

        <FadeInSection>
          <div className="intro-desc">
            I help AI, SaaS, and DevTools founders build organic content engines that drive high-intent user acquisition. 
            I ghostwrite for LinkedIn and X, launch Product Hunt campaigns, and write technical copy with a strict zero-AI-voice standard.
          </div>

          <div className="intro-cta-group">
            <a href="mailto:rehanarahman004@gmail.com" className="intro-contact">
              <EmailRoundedIcon />
              {" Let's Talk"}
            </a>
            <a href="#growth" className="intro-secondary-btn">
              <TrendingUpIcon />
              {" View Growth Stats"}
            </a>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
