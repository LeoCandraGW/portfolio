import React from "react";
import me from "../assets/me.jpg";
import Typewriter from "../components/TypeWriter";
import SkillPage from "./SkillPage";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import ProjectPage from "./ProjectPage";
import QuotePage from "./QuotePage";
import PokemonPage from "./PokemonPage";
import BattlePokemonPage from "./BattlePokemonPage";
import ThreeScene from "./ThreejsPage";
import "../styles/home.css";
import { motion, useTime, useTransform } from "framer-motion";

function HomePage() {
  const [isVisible, setIsVisible] = React.useState(true);
  const compRef = React.useRef(null);

  React.useEffect(() => {
    const me = document.getElementById("circle-container");

    const handleScroll = () => {
      const value = window.scrollY * 0.5;
      const maxScroll = 300;
      const scrollValue = Math.min(value, maxScroll);
      me.style.left = scrollValue * -5 + "px";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false });

  return (
    <>
      <section className="home" id="Home">
        <div className="home-page">
          <div className="text">
            <motion.p
              ref={compRef}
              initial={{ x: -90, opacity: 0 }}
              animate={
                isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
              }
              exit={{ x: -90, opacity: 0 }}
              transition={{
                duration: 1.5,
                type: "spring",
                delay: 0.2,
              }}
            >
              Leo Candra Gunawan Wicaksono
            </motion.p>
            <h1>
              <Typewriter text="Front-End Developer" delay={100} />
            </h1>
            <motion.p
              initial={{ x: -90 }}
              animate={isVisible ? { x: 0 } : { x: -90 }}
              transition={{
                duration: 1.5,
                type: "spring",
                delay: 0.2,
              }}
            >
              A junior front-end and mobile developer with a strong interest in
              creating effective and responsive web designs. Known for my hard
              work and quick learning ability, I have completed bootcamps in
              multi-platform and back-end development to further enhance my
              skills and stay updated with industry trends.
            </motion.p>
            <div className="skill">
              {/* Skill Icons */}
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
                title="Flutter"
                alt="Flutter"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: -90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                }}
              />
              <motion.img
                style={{ rotate }}
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                title="React"
                alt="React"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: -90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 0.5,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original-wordmark.svg"
                title="Laravel"
                alt="Laravel"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: -90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 1,
                }}
              />
              <motion.img
                style={{ rotate }}
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg"
                title="Redux"
                alt="Redux"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: -90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 1.5,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-plain-wordmark.svg"
                title="CSS3"
                alt="CSS"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: -90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: -90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 2,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
                title="HTML5"
                alt="HTML"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: 90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 2,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                title="JavaScript"
                alt="JavaScript"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: 90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 1.5,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"
                title="MySQL"
                alt="MySQL"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: 90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 1,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original-wordmark.svg"
                title="Git"
                alt="Git"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: 90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                  delay: 0.5,
                }}
              />
              <motion.img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original-wordmark.svg"
                title="VS Code"
                alt="VS Code"
                width="40"
                height="40"
                ref={compRef}
                initial={{ x: 90, opacity: 0 }}
                animate={
                  isVisible ? { x: 0, opacity: 1 } : { x: 90, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  type: "spring",
                }}
              />
            </div>
          </div>
          <div className="right" id="right">
            <div className="circle-container" id="circle-container">
              <img src={me} alt="Me" />
            </div>
            <div className="social">
              <a
                href="https://www.linkedin.com/in/leocandra/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
                  alt="LinkedIn Badge"
                />
              </a>
              <a
                href="https://www.youtube.com/@daafn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white"
                  alt="YouTube Badge"
                />
              </a>
              <a
                href="https://www.instagram.com/leo_cgw/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"
                  alt="Instagram Badge"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <SkillPage />
      <AboutPage />
      <ExperiencePage />
      <ProjectPage />
      <QuotePage />
      <PokemonPage />
      <BattlePokemonPage />
      <ThreeScene />
      <footer>
        <h1>Made With</h1>
        <div className="tech-stack">
          <motion.img
            style={{ rotate }}
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
            title="React"
            alt="React"
            width="40"
            height="40"
          />
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original-wordmark.svg"
            title="React"
            alt="React"
            width="40"
            height="40"
            style={{
              filter: "invert(100%)",
            }}
          />
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/framermotion/framermotion-original-wordmark.svg"
            title="React"
            alt="React"
            width="40"
            height="40"
            style={{
              filter: "invert(100%)",
            }}
          />
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-plain-wordmark.svg"
            title="CSS3"
            alt="CSS"
            width="40"
            height="40"
          />
          <motion.img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            title="JavaScript"
            alt="JavaScript"
            width="40"
            height="40"
          />
        </div>
      </footer>
    </>
  );
}

export default HomePage;
