import React, { useState } from "react";
import "../styles/NavBar.css";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rehana Rahman home">
        <span className="brand-mark">RR</span>
        <span>Rehana Rahman</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#growth">Growth & Proof</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#books">Books</a>
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <WbSunnyOutlinedIcon sx={{ fontSize: 18 }} />
          ) : (
            <ModeNightOutlinedIcon sx={{ fontSize: 18 }} />
          )}
        </button>

        <a className="pill pill-small desktop-cta" href="mailto:rehanarahman004@gmail.com">
          Let’s work together <span>↗</span>
        </a>

        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#growth" onClick={() => setMobileMenuOpen(false)}>Growth & Proof</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#books" onClick={() => setMobileMenuOpen(false)}>Books</a>
          <a
            className="pill pill-dark"
            href="mailto:rehanarahman004@gmail.com"
            onClick={() => setMobileMenuOpen(false)}
          >
            Let’s work together <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default NavBar;
