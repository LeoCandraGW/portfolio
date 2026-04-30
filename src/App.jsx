import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/Header";
import ThreeScene from "./pages/ThreejsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectPage from "./pages/ProjectPage";
import PokemonPage from "./pages/PokemonPage";
import BattlePokemonPage from "./pages/BattlePokemonPage";
import SkillPage from "./pages/SkillPage";

function OverlayManager() {
  const location = useLocation();
  const hash = location.hash;

  const renderSection = () => {
    switch (hash) {
      case "":
      case "#Home": return <HomePage />;
      case "#About": return <AboutPage />;
      case "#Experience": return <ExperiencePage />;
      case "#Project": return <ProjectPage />;
      case "#PokeApp": return <PokemonPage />;
      case "#Battle": return <BattlePokemonPage />;
      case "#Skill": return <SkillPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="hud-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={hash}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <div className="App-page" style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div className="scanlines"></div>
      <ThreeScene />
      <Header />
      <OverlayManager />
    </div>
  );
}

export default App;
