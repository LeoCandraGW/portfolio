import React from "react";
import "../styles/experience.css";
import { motion } from "framer-motion";

function SkillPage() {
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
      if (compRef.current) {
        observer.unobserve(compRef.current);
      }
    };
  }, [compRef]);
  return (
    <section className="experience" id="Experience">
      <div className="skill-page">
        <motion.div
          ref={compRef}
          className="card-diskominfo"
          initial={{scale: 0,  opacity:0}}
          animate={
            isVisible ? {scale: 1,  opacity:1} : {scale: 0, opacity:0}
          }
          transition={{
            duration:0.5,
            ease: "easeInOut"
          }}
        >
          <h1>DISKOMINFO SALATIGA</h1>
          <p>internship web developer</p>
          <p>"8 months, from August 2021 to March 2022."</p>
        </motion.div>
        <motion.div
          ref={compRef}
          className="card-sritex"
          initial={{scale: 0,  opacity:0}}
          animate={
            isVisible ? {scale: 1,  opacity:1} : {scale: 0, opacity:0}
          }
          transition={{
            duration:0.5,
            ease: "easeInOut"
          }}
        >
          <h1>SRITEX</h1>
          <p>FrontEnd Developer</p>
          <p>"I'm currently working in this position since September 2023."</p>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillPage;
