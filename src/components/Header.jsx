import React from "react";
import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ExperiencePage from "../pages/ExperiencePage";
import ProjectPage from "../pages/ProjectPage";
import QuotePage from "../pages/QuotePage";
import PokemonPage from "../pages/PokemonPage";
import ThreeLogo from "../pages/ThreeLogo";
import "../styles/header.css";
function Header() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header-item">
        <header>
          {isMobile ? <h2 className="logo">Leo Candra</h2> : <ThreeLogo />}
          <Navigation />
        </header>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="#Home" element={<HomePage />} />
          <Route path="#About" element={<AboutPage />} />
          <Route path="#Experience" element={<ExperiencePage />} />
          <Route path="#Project" element={<ProjectPage />} />
          <Route path="#Quote" element={<QuotePage />} />
          <Route path="#PokeApp" element={<PokemonPage />} />
        </Routes>
      </main>
    </>
  );
}

export default Header;
