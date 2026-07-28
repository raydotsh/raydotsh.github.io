import React from "react";
import "../styles/SidebarNav.css";
import FadeInSection from "./FadeInSection";
import { useMediaQuery } from "@mui/material";

const SidebarNav = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const links = [
    <a key="1" href="/#intro"><span className="nav-slash">/</span>home</a>,
    <a key="2" href="/#about"><span className="nav-slash">/</span>about</a>,
    <a key="3" href="/#growth"><span className="nav-slash">/</span>proof</a>,
    <a key="4" href="/#experience"><span className="nav-slash">/</span>experience</a>,
    <a key="5" href="/#projects"><span className="nav-slash">/</span>software</a>,
    <a key="6" href="/#books"><span className="nav-slash">/</span>books</a>,
    <a key="7" href="/#contact"><span className="nav-slash">/</span>contact</a>
  ];

  return (
    <div className="sidebar-nav">
      {!isMobile && (
        <div className="sidebar-links">
          {links.map((link, i) => (
            <FadeInSection key={i} delay={(i + 1) * 80 + "ms"}>
              <div>{link}</div>
            </FadeInSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
