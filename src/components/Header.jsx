import React from "react";
import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ExperiencePage from "../pages/ExperiencePage";
import ProjectPage from "../pages/ProjectPage";
import "../styles/header.css";
function Header() {
  return (
    <>
      <div className="header-item">
        <header>
          <h2 className="logo">Leo Candra</h2>
          <Navigation />
        </header>
      </div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="#Home" element={<HomePage />} />
            <Route path="#About" element={<AboutPage />} />
            <Route path="#Experience" element={<ExperiencePage />} />
            <Route path="#Project" element={<ProjectPage />} />
          </Routes>
        </main>
    </>
  );
}

export default Header;
