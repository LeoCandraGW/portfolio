// src/Typewriter.js
import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState(text[0]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    if (currentIndex === text.length) {
      const resetTimeout = setTimeout(() => {
        setCurrentText(text[0]);
        setCurrentIndex(1);
      }, delay * 3);

      return () => clearTimeout(resetTimeout);
    }

    const timeout = setTimeout(() => {
      setCurrentText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export default Typewriter;
