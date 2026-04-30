import React from "react";
import { motion } from "framer-motion";

const HpBar = ({ currentHp, maxHp }) => {
  const hpPercentage = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
  
  // Color shifts from cyan to neon yellow to red as HP drops
  const shieldColor = hpPercentage > 50 
    ? "var(--hud-cyan)" 
    : hpPercentage > 20 
      ? "var(--hud-neon-yellow)" 
      : "var(--hud-red)";

  return (
    <div style={{ width: "100%", margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span className="mono" style={{ fontSize: "10px", color: shieldColor }}>INTEGRITY</span>
        <span className="mono" style={{ fontSize: "10px", color: shieldColor }}>{Math.floor(hpPercentage)}%</span>
      </div>
      
      <div style={{
        width: "100%",
        height: "8px",
        border: `1px solid ${shieldColor}`,
        background: "rgba(0,0,0,0.5)",
        overflow: "hidden",
        position: "relative"
      }}>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${hpPercentage}%`, backgroundColor: shieldColor }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: "100%",
            boxShadow: `0 0 10px ${shieldColor}`
          }}
        />
      </div>
    </div>
  );
};

export default HpBar;
