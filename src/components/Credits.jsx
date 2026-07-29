import React, { useState } from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import ContactCanvas from "./ContactCanvas";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const Credits = () => {
  const [copied, setCopied] = useState(false);
  const email = "rehanarahman004@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="contact">
      <section className="contact">
        <ContactCanvas />
        <div className="contact-inner reveal visible">
          <span className="kicker">Have a project in mind?</span>
          <h2>
            Let’s make your brand
            <br />
            <em>impossible to scroll past.</em>
          </h2>

          <div className="contact-action-box">
            <a
              className="pill pill-light"
              href={`mailto:${email}?subject=Project%20Inquiry`}
            >
              {email} <span>↗</span>
            </a>

            <button
              className="copy-pill-btn"
              onClick={handleCopy}
              title="Copy email address"
            >
              {copied ? (
                <>
                  <CheckIcon sx={{ fontSize: 16 }} /> Copied!
                </>
              ) : (
                <>
                  <ContentCopyIcon sx={{ fontSize: 16 }} /> Copy Email
                </>
              )}
            </button>
          </div>

          <p className="location-text">Based in Bengaluru, India · Working worldwide</p>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top">
          <span className="brand-mark">RR</span>
          <span>Rehana Rahman</span>
        </a>

        <div className="footer-links">
          <a
            href="https://x.com/raydotsh"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/rehana-rahman/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/raydotsh"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={`mailto:${email}`}>Email</a>
        </div>

        <p className="copyright-text">
          © {new Date().getFullYear()} Rehana Rahman
        </p>
      </footer>
    </div>
  );
};

export default Credits;
