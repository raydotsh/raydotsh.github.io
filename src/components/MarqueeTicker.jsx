import React from "react";
import "../styles/MarqueeTicker.css";

const MarqueeTicker = () => {
  const items = ["STRATEGY", "CONTENT", "COMMUNITY", "GROWTH", "DEVTOOLS", "COPYWRITING"];

  return (
    <section className="marquee" aria-label="Capabilities">
      <div className="marquee-track">
        {items.concat(items).map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <i>✦</i>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default MarqueeTicker;
