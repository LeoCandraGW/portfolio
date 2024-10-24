import React from "react";
import "../styles/project.css";
import { motion } from "framer-motion";
function ProjectPage() {
  const [isVisible, setIsVisible] = React.useState(true);
  const compRef = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (compRef.current) {
      observer.observe(compRef.current);
    }
    return () => {
      observer.unobserve(compRef.current);
    };
  }, [compRef]);
  return (
    <section className="project" id="Project">
      <div className="project-page">
        <motion.div
          ref={compRef}
          className="card-calculator"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={
            isVisible
              ? { scale: 1, opacity: 1, rotate: 360 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.2,
            type: "spring",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
          />
        </motion.div>
        <motion.div
          ref={compRef}
          className="card-mobile-note"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={
            isVisible
              ? { scale: 1, opacity: 1, rotate: 360 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.5,
            type: "spring",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
          />
        </motion.div>
        <motion.div
          ref={compRef}
          className="card-note"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={
            isVisible
              ? { scale: 1, opacity: 1, rotate: 360 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.8,
            type: "spring",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
            title="React"
            alt="React"
            width="60"
            height="60"
          />
        </motion.div>
        <motion.div
          ref={compRef}
          className="card-forum"
          initial={{ scale: 0, opacity: 0, rotate: 180 }}
          animate={
            isVisible
              ? { scale: 1, opacity: 1, rotate: 360 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 1.1,
            type: "spring",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
            title="React"
            alt="React"
            width="60"
            height="60"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectPage;
