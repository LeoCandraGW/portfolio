import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "../data";

function SkillPage() {
  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: "800px", width: "90%", marginTop: "100px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "30px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[TECH_SPEC: ARSENAL]</h2>
        <span className="blink" style={{ color: "var(--hud-neon-yellow)" }}>ACTIVE</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {PORTFOLIO_DATA.skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "15px", 
              background: "rgba(0, 243, 255, 0.05)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              padding: "10px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <img src={skill.icon} alt={skill.name} style={{ width: "30px", height: "30px" }} />
            <span className="mono" style={{ color: "var(--text-primary)" }}>{skill.name}</span>
            <div style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: "100%", background: "var(--hud-cyan)", opacity: 0.5 }}></div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.random() * 40 + 60}%` }} 
              transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
              style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "var(--hud-neon-yellow)", boxShadow: "0 0 10px var(--hud-neon-yellow)" }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillPage;
