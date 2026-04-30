import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "../data";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

function AboutPage() {
  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "800px", width: "90%", marginTop: "100px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "20px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[USR_DATA: PERSONNEL FILE]</h2>
        <span style={{ color: "var(--hud-blue)", fontFamily: "Share Tech Mono" }}>AUTH: VERIFIED</span>
      </div>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <h3 className="mono" style={{ color: "var(--hud-neon-yellow)", marginBottom: "5px" }}>ID: {PORTFOLIO_DATA.about.name}</h3>
          <p className="mono" style={{ color: "var(--text-secondary)", marginBottom: "5px" }}>BORN: {PORTFOLIO_DATA.about.born}</p>
          <p className="mono" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>LOC: {PORTFOLIO_DATA.about.location}</p>
          
          <div style={{ borderLeft: "2px solid var(--hud-cyan)", paddingLeft: "15px", marginBottom: "20px" }}>
            <p className="mono" style={{ color: "var(--text-primary)", lineHeight: "1.6" }}>
              {PORTFOLIO_DATA.about.bio}
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <a href={PORTFOLIO_DATA.about.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--hud-cyan)", fontSize: "24px" }}><FaLinkedin /></a>
            <a href={PORTFOLIO_DATA.about.socials.youtube} target="_blank" rel="noreferrer" style={{ color: "var(--hud-red)", fontSize: "24px" }}><FaYoutube /></a>
            <a href={PORTFOLIO_DATA.about.socials.instagram} target="_blank" rel="noreferrer" style={{ color: "var(--hud-neon-yellow)", fontSize: "24px" }}><FaInstagram /></a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutPage;
