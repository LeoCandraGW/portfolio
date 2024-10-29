import { div } from "framer-motion/client";
import React from "react";

const Pokemon = ({ pokemon }) => {
  return (
    <div className="pokemon-image">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ filter: "brightness(0)" }}
      />
    </div>
  );
};

export default Pokemon;
