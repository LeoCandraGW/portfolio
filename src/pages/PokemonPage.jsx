import React from "react";
import Pokemon from "../components/Pokemon";
import "../styles/pokemon.css";
import { section } from "framer-motion/client";
import { motion } from "framer-motion";
import { FaHandPointDown } from "react-icons/fa";

function PokemonPage() {
  const [pokemon, setPokemon] = React.useState(null);
  const [guess, setGuess] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [length, setLength] = React.useState(1);
  const [pokename, setPokename] = React.useState("");
  const ConstraintsRef = React.useRef(null);

  React.useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const responseJson = await response.json();
    setPokemon(responseJson);
    setMessage("");
    setGuess("");
    setLength(2);
    setPokename(responseJson.name.slice(0, 1));
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (guess.length == 0) {
      setMessage("Make some guess!");
      return;
    }
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setScore(score + 1);
      setMessage(`Correct! It's ${pokemon.name}`);
    } else {
      setMessage(`Oops! It's ${pokemon.name}`);
    }
    setTimeout(fetchRandomPokemon, 2000);
  };

  const handleHintPress = () => {
    if (length <= pokemon.name.length) {
      setLength(length + 1);
    }
    setPokename(pokemon.name.slice(0, length));
  };

  return (
    <section className="PokeApp" id="PokeApp">
      <motion.div ref={ConstraintsRef} className="pokemon-page">
        <h1>What is that Pokémon!</h1>
        <h2>Score : {score}</h2>
        <motion.div drag dragConstraints={ConstraintsRef}>
          {pokemon && <Pokemon pokemon={pokemon} />}
        </motion.div>
        <div className="hint">
          <h1>{pokename}</h1>
          <button type="button" onClick={handleHintPress}>
            Hint!
          </button>
        </div>
        <form onSubmit={handleGuessSubmit}>
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type="submit">Submit Guess</button>
        </form>
        <p>{message}</p>
        <p><FaHandPointDown /> Scroll for battle simulator</p>
      </motion.div>
    </section>
  );
}

export default PokemonPage;
