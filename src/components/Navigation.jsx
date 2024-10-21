import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const [activeSection, setActiveSection] = React.useState(location.hash); // Use location.hash

  React.useEffect(() => {
    if (window.location.pathname === "/" && window.location.hash === "") {
      setActiveSection("#Home");
    }
  }, []);

  const handleNavClick = (path) => {
    setActiveSection(path);
    console.log("path" + path);
  };

  console.log("active" + activeSection);
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLinks = [
    { path: "#Home", label: "Home" },
    { path: "#About", label: "About" },
    { path: "#Experience", label: "Experience" },
    { path: "#Project", label: "Project" },
  ];

  return (
    <div className="navigation">
      <div className={`nav-links ${isOpen ? "show" : ""}`}>
        {NavLinks.map(({ path, label }) => (
          <a
            key={path}
            href={path} // Links to section IDs
            onClick={() => handleNavClick(path)}
            className={activeSection === path ? "active" : ""} // Use strict equality
          >
            {label}
          </a>
        ))}
      </div>
      <button
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </div>
  );
}

export default Navigation;
