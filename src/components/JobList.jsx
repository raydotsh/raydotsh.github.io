import React, { useState } from "react";
import FadeInSection from "./FadeInSection";

const JobList = () => {
  const experienceItems = [
    {
      num: "01",
      title: "Freelance Content Strategist & Technical Copywriter",
      role: "Freelance Strategy",
      duration: "2023 - PRESENT",
      desc: "Architect end-to-end content strategies and ghostwrite across LinkedIn and X for AI, SaaS, and Web3 founders. Delivered over 1M+ organic impressions with an 8.0% engagement rate. Lead high-converting Product Hunt launch sequences and technical documentation.",
      tags: ["Audit", "Ghostwriting", "Analytics", "Launch"],
    },
    {
      num: "02",
      title: "Newsletter Editor & Growth Lead @ FundMeMommy",
      role: "FundMeMommy",
      duration: "ONGOING",
      desc: "Publish a weekly publication profiling indie tech projects, developer tooling, and founder build stories for an audience of active builders. Direct full editorial strategy, landing page copy, and subscriber growth funnels.",
      tags: ["Editorial", "Newsletter", "Growth", "DevTools"],
    },
  ];

  return (
    <div className="service-list">
      {experienceItems.map((item, index) => (
        <article className="service-item" key={index}>
          <span>{item.num}</span>
          <div>
            <div className="service-header-row">
              <h3>{item.title}</h3>
              <span className="service-duration">{item.duration}</span>
            </div>
            <p>{item.desc}</p>
            <div className="tags">
              {item.tags.map((tag, tIndex) => (
                <b key={tIndex}>{tag}</b>
              ))}
            </div>
          </div>
          <i>↗</i>
        </article>
      ))}
    </div>
  );
};

export default JobList;
