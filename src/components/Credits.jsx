import React, { useState } from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";

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
      <FadeInSection>
        <div className="contact-card">
          <span className="contact-tag">/ let's connect</span>
          <h2 className="contact-heading">Ready to scale your content engine?</h2>
          <p className="contact-subtext">
            Whether you need ghostwriting for LinkedIn/X, launch copy for your Product Hunt release, or end-to-end content strategy, my inbox is always open.
          </p>

          <div className="contact-email-box">
            <span className="contact-email-text">{email}</span>
            <button className="copy-email-btn" onClick={handleCopy} title="Copy email to clipboard">
              {copied ? (
                <>
                  <CheckIcon sx={{ fontSize: 18 }} /> Copied!
                </>
              ) : (
                <>
                  <ContentCopyIcon sx={{ fontSize: 18 }} /> Copy Email
                </>
              )}
            </button>
          </div>

          <div className="contact-socials-row">
            <a href={`mailto:${email}`} className="contact-social-link" title="Send Email">
              <EmailIcon /> Email
            </a>
            <a href="https://x.com/raydotsh" target="_blank" rel="noopener noreferrer" className="contact-social-link" title="X Profile">
              <XIcon /> @raydotsh
            </a>
            <a href="https://www.linkedin.com/in/rehana-rahman/" target="_blank" rel="noopener noreferrer" className="contact-social-link" title="LinkedIn Profile">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href="https://github.com/raydotsh" target="_blank" rel="noopener noreferrer" className="contact-social-link" title="GitHub Profile">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>

        <div id="credits">
          <div className="ending-credits">
            <div>Built & designed by Rehana Rahman | Bengaluru, India</div>
            <div>All rights reserved. © {new Date().getFullYear()}</div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Credits;
