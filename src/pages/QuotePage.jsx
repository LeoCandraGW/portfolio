import React from "react";
import "../styles/quote.css";
import { motion } from "framer-motion";

function QuotePage() {
  return (
    <section className="quote" id="Quote">
      <div className="container">
        <span className="txt anim-text-flow">
          "You can't control the wind, but you can adjust your sails."
        </span>
      </div>
    </section>
  );
}

export default QuotePage;
