import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "../data";

function HomePage() {
  const [bootLog, setBootLog] = React.useState([]);
  
  React.useEffect(() => {
    const logs = [
      "INITIALIZING SYS.OS...",
      "ESTABLISHING UPLINK WITH SOLAR NETWORK...",
      "LOADING PERSONNEL FILE: LEO CANDRA",
      "DECRYPTING PROFILE DATA...",
      "SYSTEM READY. WELCOME COMMANDER."
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setBootLog(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="hud-panel"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ maxWidth: "600px", width: "90%", marginTop: "100px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "20px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[SYS_HOME]</h2>
        <span className="blink" style={{ color: "var(--hud-red)" }}>REC</span>
      </div>

      <div className="mono" style={{ fontSize: "14px", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "30px" }}>
        {bootLog.map((log, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            > {log}
          </motion.div>
        ))}
      </div>

      {bootLog.length >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ color: "var(--hud-neon-yellow)", fontSize: "2.5rem", marginBottom: "10px" }}>{PORTFOLIO_DATA.about.name}</h1>
          <h3 className="mono" style={{ color: "var(--hud-cyan)", marginBottom: "20px" }}>ROLE: {PORTFOLIO_DATA.about.role}</h3>
          
          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <a href="#About" className="mono" style={{ 
              padding: "10px 20px", 
              border: "1px solid var(--hud-neon-yellow)", 
              color: "var(--hud-neon-yellow)", 
              textDecoration: "none",
              textTransform: "uppercase"
            }}>ACCESS FILES [ENTER]</a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default HomePage;
