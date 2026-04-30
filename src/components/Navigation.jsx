import React from "react";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const hash = location.hash || "#Home";

  return (
    <nav className="nav-hud">
      <a href="#Home" className={hash === "#Home" ? "active" : ""}>SYS_HOME</a>
      <a href="#About" className={hash === "#About" ? "active" : ""}>USR_DATA</a>
      <a href="#Skill" className={hash === "#Skill" ? "active" : ""}>TECH_SPEC</a>
      <a href="#Experience" className={hash === "#Experience" ? "active" : ""}>FLIGHT_LOG</a>
      <a href="#Project" className={hash === "#Project" ? "active" : ""}>DATABASE</a>
      <a href="#PokeApp" className={hash === "#PokeApp" ? "active" : ""}>ENTITY_SCAN</a>
      <a href="#Battle" className={hash === "#Battle" ? "active" : ""}>COMBAT_SIM</a>
    </nav>
  );
}

export default Navigation;
