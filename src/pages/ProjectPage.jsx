import React from "react";
import "../styles/project.css";
import { motion } from "framer-motion";
function ProjectPage() {
  return (
    <section className="project" id="Project">
      <div className="project-page">
        <div className="card-calculator">
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
          />
        </div>
        <div className="card-mobile-note">
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
          />
        </div>
        <div className="card-note">
          <motion.img
           src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
           title="React"
           alt="React"
            width="60"
            height="60"
          />
        </div>
        <div className="card-forum">
          <motion.img
           src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
           title="React"
           alt="React"
            width="60"
            height="60"
          />
        </div>
      </div>
    </section>
  );
}

export default ProjectPage;
