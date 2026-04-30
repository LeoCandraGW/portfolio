import React from "react";
import Navigation from "./Navigation";
import ThreeLogo from "../pages/ThreeLogo";
import "../styles/header.css";

function Header() {
  return (
    <div className="header-hud">
      <div className="logo-container">
        <ThreeLogo />
        <h1 className="logo-text">SYS.OS</h1>
      </div>
      <Navigation />
    </div>
  );
}

export default Header;
