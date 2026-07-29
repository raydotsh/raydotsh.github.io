import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "About", href: "#about", num: "01" },
    { label: "Growth & Proof", href: "#growth", num: "02" },
    { label: "Experience", href: "#experience", num: "03" },
    { label: "Projects", href: "#projects", num: "04" },
    { label: "Books", href: "#books", num: "05" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
        <a className="brand" href="#top" aria-label="Rehana Rahman home" onClick={closeMenu}>
          <span className="brand-mark">RR</span>
          <span className="brand-name">Rehana Rahman</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
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
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header-space" />
          
          <span className="mobile-menu-label">Navigation</span>
          
          <nav className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={closeMenu}
                style={{ animationDelay: `${(index + 1) * 0.06}s` }}
              >
                <span className="mobile-link-num">{item.num}</span>
                <span className="mobile-link-text">{item.label}</span>
                <span className="mobile-link-arrow">→</span>
              </a>
            ))}
          </nav>

          <div className="mobile-nav-footer">
            <div className="mobile-nav-meta">
              <span>Bengaluru, India</span>
              <span>@raydotsh</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
