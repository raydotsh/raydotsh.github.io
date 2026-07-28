import React, { useState } from "react";
import "../styles/GrowthProof.css";
import FadeInSection from "./FadeInSection";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleIcon from "@mui/icons-material/People";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";

const GrowthProof = () => {
  const [activeImage, setActiveImage] = useState(null);

  const metrics = [
    {
      label: "Impressions",
      value: "1M+",
      trend: "↑ 19,000%",
      subtext: "Organic X / Twitter reach",
      icon: <VisibilityIcon sx={{ fontSize: 24 }} />,
    },
    {
      label: "Total Engagements",
      value: "82.2K",
      trend: "↑ 19,000%",
      subtext: "Likes, retweets & replies",
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
    },
    {
      label: "Engagement Rate",
      value: "8.0%",
      trend: "↑ 1.1%",
      subtext: "Industry standard is ~1.5%",
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
    },
    {
      label: "Profile Visits",
      value: "16.2K",
      trend: "↑ 15,000%",
      subtext: "High-intent founder traffic",
      icon: <PeopleIcon sx={{ fontSize: 24 }} />,
    },
    {
      label: "Post Likes",
      value: "31.1K",
      trend: "↑ 47,000%",
      subtext: "High resonance content",
      icon: <FavoriteIcon sx={{ fontSize: 24 }} />,
    },
    {
      label: "Bookmarks & Saves",
      value: "1,000+",
      trend: "↑ 10,000%",
      subtext: "Evergreen value posts",
      icon: <BookmarkIcon sx={{ fontSize: 24 }} />,
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
      desc: "1.97K+ tech founders and dev audience: 'i manage your socials so that you focus on building'",
      src: "/assets/growth_x_profile.png",
      tag: "1.97K+ Followers",
    },
  ];

  return (
    <div id="growth">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">/ growth & proof</span>
          <span className="explore-link">Verified Organic Stats</span>
        </div>

        <p className="growth-subtitle">
          Real numbers, organic growth, zero paid ad spend. I build content systems that convert technical authority into audience growth.
        </p>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <FadeInSection key={i} delay={(i + 1) * 80 + "ms"}>
              <div className="metric-card">
                <div className="metric-header">
                  <span className="metric-icon">{m.icon}</span>
                  <span className="metric-trend">{m.trend}</span>
                </div>
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-subtext">{m.subtext}</div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Proof Screenshots Showcase */}
        <div className="proof-showcase-title">
          <h3>Visual Proof & Campaign Highlights</h3>
          <p>Click any screenshot to expand full resolution</p>
        </div>

        <div className="proof-cards-grid">
          {proofScreenshots.map((item, index) => (
            <FadeInSection key={index} delay={(index + 1) * 150 + "ms"}>
              <div className="proof-card" onClick={() => setActiveImage(item)}>
                <div className="proof-card-image-wrapper">
                  <img src={item.src} alt={item.title} className="proof-card-img" />
                  <div className="proof-card-overlay">
                    <span className="expand-badge">
                      <OpenInFullIcon sx={{ fontSize: 18 }} /> Expand Screenshot
                    </span>
                  </div>
                  <span className="proof-tag">{item.tag}</span>
                </div>
                <div className="proof-card-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Modal for viewing screenshots */}
        {activeImage && (
          <div className="proof-modal-backdrop" onClick={() => setActiveImage(null)}>
            <div className="proof-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="proof-modal-close"
                onClick={() => setActiveImage(null)}
                aria-label="Close image preview"
              >
                <CloseIcon />
              </button>
              <img src={activeImage.src} alt={activeImage.title} className="proof-modal-img" />
              <div className="proof-modal-caption">
                <h4>{activeImage.title}</h4>
                <p>{activeImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </FadeInSection>
    </div>
  );
};

export default GrowthProof;
