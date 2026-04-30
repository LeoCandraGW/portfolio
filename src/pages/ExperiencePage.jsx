import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "../data";

function ExperiencePage() {
  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: "800px", width: "90%", marginTop: "100px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "30px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[FLIGHT_LOG: EXPERIENCE]</h2>
        <span className="mono" style={{ color: "var(--text-secondary)" }}>UPLINK ESTABLISHED</span>
      </div>

      <div style={{ position: "relative", borderLeft: "2px solid rgba(0, 243, 255, 0.2)", paddingLeft: "30px", marginLeft: "15px" }}>
        {PORTFOLIO_DATA.experience.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            style={{ marginBottom: "40px", position: "relative" }}
          >
            {/* Timeline dot */}
            <div style={{ 
              position: "absolute", 
              left: "-37px", 
              top: "5px",
              width: "12px", 
              height: "12px", 
              background: "var(--hud-neon-yellow)",
              boxShadow: "0 0 10px var(--hud-neon-yellow)",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            }}></div>

            <h3 className="hud-title" style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: "5px" }}>{exp.company}</h3>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: "15px" }}>
              <span className="mono" style={{ color: "var(--hud-cyan)" }}>ROLE: {exp.role}</span>
              <span className="mono" style={{ color: "var(--text-secondary)" }}>T-MINUS: {exp.duration}</span>
            </div>
            
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "15px", border: "1px dashed rgba(0, 243, 255, 0.3)" }}>
              <p className="mono" style={{ color: "var(--text-primary)", fontSize: "14px" }}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ExperiencePage;
