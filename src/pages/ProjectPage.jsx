import React from "react";
import "../styles/project.css";
import { motion, useTime, useTransform } from "framer-motion";
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

  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false });
  return (
    <section className="project" id="Project">
      <motion.div ref={compRef} className="project-page">
        <motion.div
          drag
          dragConstraints={compRef}
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
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
            animate={{
              rotate: [90, 90, 0, 90],
              y: [100, -100, 0, 100],
              borderRadius: ["50%", "50%", "0%", "50%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.div>
        <motion.div
          drag
          dragConstraints={compRef}
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
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
            title="Flutter"
            alt="Flutter"
            width="60"
            height="60"
            animate={{
              rotate: [90, 90, 0, 90],
              y: [100, -100, 0, 100],
              borderRadius: ["50%", "50%", "0%", "50%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </motion.div>
        <motion.div
          drag
          dragConstraints={compRef}
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
          <motion.img
            style={{ rotate }}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
            title="React"
            alt="React"
            width="60"
            height="60"
          />
        </motion.div>
        <motion.div
          drag
          dragConstraints={compRef}
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
          <motion.img
            style={{ rotate }}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
            title="React"
            alt="React"
            width="60"
            height="60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProjectPage;
