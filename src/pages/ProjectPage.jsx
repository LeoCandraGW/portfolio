import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "../data";

// Since we can't easily dynamically require images with Vite in a mapped array without explicit imports,
// we will import them here and map them.
import calcImg from "../assets/projects/calculator.jpg";
import mnoteImg from "../assets/projects/mobile-note.jpg";
import notImg from "../assets/projects/note.jpg";
import foruImg from "../assets/projects/forum.jpg";

const imageMap = {
  "calc": calcImg,
  "mnote": mnoteImg,
  "not": notImg,
  "foru": foruImg
};

function ProjectPage() {
  const [selectedId, setSelectedId] = React.useState(null);

  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "1000px", width: "95%", marginTop: "100px", padding: "40px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "30px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[DATABASE: PROJECTS]</h2>
        <span className="blink mono" style={{ color: "var(--hud-red)" }}>ARCHIVES ENCRYPTED</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" }}>
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <motion.div 
            key={index}
            layoutId={`card-${index}`}
            onClick={() => setSelectedId(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              position: "relative",
              border: "1px solid rgba(0, 243, 255, 0.3)",
              cursor: "pointer",
              background: "rgba(0,0,0,0.5)",
              overflow: "hidden"
            }}
          >
            {/* Tech tag corner */}
            <div style={{ position: "absolute", top: "10px", right: "10px", background: "var(--hud-cyan)", color: "#000", padding: "2px 8px", fontSize: "12px", zIndex: 2 }} className="mono font-bold">
              {project.tech}
            </div>
            
            <motion.div style={{ width: "100%", height: "150px", overflow: "hidden" }}>
              <img src={imageMap[project.image]} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, filter: "grayscale(50%) sepia(100%) hue-rotate(180deg)" }} />
            </motion.div>
            
            <div style={{ padding: "15px", borderTop: "1px solid rgba(0, 243, 255, 0.3)" }}>
              <h3 className="mono" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--bg-primary)",
                border: "2px solid var(--hud-cyan)",
                padding: "20px",
                width: "90%",
                maxWidth: "600px",
                boxShadow: "0 0 50px rgba(0, 243, 255, 0.2)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                 <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>{PORTFOLIO_DATA.projects[selectedId].title}</h2>
                 <button onClick={() => setSelectedId(null)} className="mono" style={{ background: "none", border: "1px solid var(--hud-red)", color: "var(--hud-red)", padding: "5px 10px", cursor: "pointer" }}>[CLOSE]</button>
              </div>
              <img src={imageMap[PORTFOLIO_DATA.projects[selectedId].image]} style={{ width: "100%", border: "1px solid rgba(0,243,255,0.5)" }} alt="project" />
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                 <span className="mono" style={{ color: "var(--text-secondary)" }}>TECH: {PORTFOLIO_DATA.projects[selectedId].tech}</span>
                 <span className="blink mono" style={{ color: "var(--hud-neon-yellow)" }}>ANALYSIS COMPLETE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectPage;
