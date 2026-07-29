import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/GrowthProof.css";
import FadeInSection from "./FadeInSection";
import TiltCard from "./TiltCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleIcon from "@mui/icons-material/People";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";

const GrowthProof = () => {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const metrics = [
    {
      label: "Impressions",
      value: "1M+",
      trend: "↑ 19,000%",
      subtext: "Organic X / Twitter reach",
      icon: <VisibilityIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Total Engagements",
      value: "82.2K",
      trend: "↑ 19,000%",
      subtext: "Likes, retweets & replies",
      icon: <TrendingUpIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Engagement Rate",
      value: "8.0%",
      trend: "↑ 1.1%",
      subtext: "Industry standard is ~1.5%",
      icon: <TrendingUpIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Profile Visits",
      value: "16.2K",
      trend: "↑ 15,000%",
      subtext: "High-intent founder traffic",
      icon: <PeopleIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Post Likes",
      value: "31.1K",
      trend: "↑ 47,000%",
      subtext: "High resonance content",
      icon: <FavoriteIcon sx={{ fontSize: 22 }} />,
    },
    {
      label: "Bookmarks & Saves",
      value: "1,000+",
      trend: "↑ 10,000%",
      subtext: "Evergreen value posts",
      icon: <BookmarkIcon sx={{ fontSize: 22 }} />,
    },
  ];

  const proofScreenshots = [
    {
      id: "analytics",
      title: "X Organic Analytics Dashboard",
      desc: "1M+ Impressions, 82.2K Engagements, 8% Engagement Rate verified dashboard",
      src: "/assets/growth_analytics_1.jpeg",
      tag: "Analytics Verified",
    },
    {
      id: "x-profile",
      title: "@raydotsh X Profile & Community",
      desc: "1.97K+ tech followers and dev audience: 'i manage your socials so that you focus on building'",
      src: "/assets/growth_x_profile.png",
      tag: "1.97K+ Followers",
    },
  ];

  const handleOpenModal = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImage(item);
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveImage(null);
  };

  return (
    <section className="growth section" id="growth">
      <FadeInSection>
        <div className="section-heading">
          <div>
            <span className="kicker">02 / Growth & Proof</span>
            <h2>
              Real numbers, organic reach.
              <br />
              <em>Zero ad spend.</em>
            </h2>
          </div>
          <p>
            I build content engines that convert technical authority into audience growth. Here is empirical proof from recent organic campaigns.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <TiltCard key={i} className="growth-metric-card">
              <div className="metric-header">
                <span className="metric-icon">{m.icon}</span>
                <span className="metric-trend">{m.trend}</span>
              </div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-subtext">{m.subtext}</div>
            </TiltCard>
          ))}
        </div>

        {/* Proof Screenshots Showcase */}
        <div className="proof-heading">
          <h3>Visual Proof & Campaign Screenshots</h3>
          <p>Click any screenshot for high-resolution verification preview</p>
        </div>

        <div className="proof-cards-grid">
          {proofScreenshots.map((item, index) => (
            <TiltCard
              key={index}
              className="proof-card"
              onClick={(e) => handleOpenModal(e, item)}
            >
              <div className="proof-card-image-wrapper">
                <img src={item.src} alt={item.title} className="proof-card-img" />
                <div className="proof-card-overlay">
                  <span className="expand-badge">
                    <OpenInFullIcon sx={{ fontSize: 16 }} /> Expand Screenshot
                  </span>
                </div>
                <span className="proof-tag">{item.tag}</span>
              </div>
              <div className="proof-card-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </FadeInSection>

      {/* Modal Lightbox via Portal */}
      {activeImage &&
        ReactDOM.createPortal(
          <div className="proof-modal-backdrop" onClick={handleCloseModal}>
            <div className="proof-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="proof-modal-close"
                onClick={handleCloseModal}
                aria-label="Close image preview"
              >
                <CloseIcon />
              </button>
              <div className="proof-modal-image-container">
                <img src={activeImage.src} alt={activeImage.title} className="proof-modal-img" />
              </div>
              <div className="proof-modal-caption">
                <h4>{activeImage.title}</h4>
                <p>{activeImage.desc}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default GrowthProof;
