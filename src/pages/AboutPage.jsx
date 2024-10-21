import React from "react";
import "../styles/about.css";
import me from "../assets/me.jpg";

function AboutPage() {
  return (
    <section className="about" id="About">
      <div className="about-page">
        <h1 className="name">Leo Candra Gunawan Wicaksono</h1>
        <h1 className="born">Salatiga, 16 September 1998</h1>
        <h1 className="live">Currently Live in Sukoharjo</h1>
      </div>
    </section>
  );
}

export default AboutPage;
