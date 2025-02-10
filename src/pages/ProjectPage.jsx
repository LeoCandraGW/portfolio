import React from "react";
import "../styles/project.css";
import calc from "../assets/projects/calculator.jpg";
import mobilenot from "../assets/projects/mobile-note.jpg";
import not from "../assets/projects/note.jpg";
import foru from "../assets/projects/forum.jpg";
import { motion, useTime, useTransform } from "framer-motion";
 
function ProjectPage() {
  const toggleClick = (id) => {
    const elements = document.querySelectorAll(".wrapper");

    elements.forEach((el) => {
      if (el.id === id) {
        el.classList.add("show");
        el.classList.remove("notShow");

        // Show the .article inside the clicked element
        const article = el.querySelector(".article");
        if (article) article.classList.add("show");
      } else {
        el.classList.add("notShow");
        el.classList.remove("show");

        // Hide the .article in other elements
        const article = el.querySelector(".article");
        if (article) article.classList.remove("show");
      }
    });
  };

  const resetClick = (event) => {
    event.stopPropagation(); // Prevents click from affecting parent elements
    const elements = document.querySelectorAll(".wrapper");

    elements.forEach((el) => {
      el.classList.remove("show", "notShow");

      // Hide all articles when reset is clicked
      const article = el.querySelector(".article");
      if (article) article.classList.remove("show");
    });
  };

  return (
    <section className="project" id="Project">
      <div
        className="wrapper calc"
        id="calc"
        onClick={() => toggleClick("calc")}
      >
        <div className="child">
          <img src={calc} alt="calculator" />
          <div className="article">
            <h1>Calculator</h1>
            <p>Made with Flutter</p>
            <div className="closebt">
              <button onClick={resetClick}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="wrapper mnote"
        id="mnote"
        onClick={() => toggleClick("mnote")}
      >
        <div className="child">
          <img src={mobilenot} alt="calculator" />
          <div className="article">
            <h1>Mobile Note App</h1>
            <p>A Mobile note that i made with flutter</p>
            <div className="closebt">
              <button onClick={resetClick}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper not" id="not" onClick={() => toggleClick("not")}>
        <div className="child">
          <img src={not} alt="calculator" />
          <div className="article">
            <h1>My Note App</h1>
            <p>A note website that i made with react</p>
            <div className="closebt">
              <button onClick={resetClick}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="wrapper foru"
        id="foru"
        onClick={() => toggleClick("foru")}
      >
        <div className="child">
          <img src={foru} alt="calculator" />
          <div className="article">
            <h1>Forum Online</h1>
            <p>Made with React</p>
            <div className="closebt">
              <button onClick={resetClick}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectPage;
