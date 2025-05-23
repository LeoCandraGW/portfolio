import { section } from "framer-motion/client";
import React from "react";
import ParallaxText from "../components/Velocity";
import "../styles/skill.css";

function SkillPage() {
  return (
    <section className="SkillPage" id="SkillPage">
      <div className="skill-page">
        <ParallaxText baseVelocity={-5}>FrontEnd Developer</ParallaxText>
        <ParallaxText baseVelocity={5}>FrontEnd Developer</ParallaxText>
      </div>
    </section>
  );
}

export default SkillPage;
