import React from "react";
import "../styles/quote.css";
import { motion } from "framer-motion";

function QuotePage() {
  return (
    <section className="quote overlay-section" id="Quote">
      <div className="container overlay-card" style={{ textAlign: "center" }}>
        <span className="txt anim-text-flow" style={{ fontSize: "2rem", fontStyle: "italic", fontWeight: 600 }}>
          "You can't control the wind, but you can adjust your sails."
        </span>
      </div>
    </section>
  );
}

export default QuotePage;
