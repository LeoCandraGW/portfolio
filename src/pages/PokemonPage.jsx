import React from "react";
import Pokemon from "../components/Pokemon";
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
    if (guess.length === 0) {
      setMessage("INPUT REQUIRED.");
      return;
    }
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setScore(score + 1);
      setMessage(`MATCH FOUND: ${pokemon.name.toUpperCase()}`);
    } else {
      setMessage(`INCORRECT. IDENTITY: ${pokemon.name.toUpperCase()}`);
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
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "600px", width: "90%", marginTop: "100px", textAlign: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "20px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[SIMULATOR: IDENTIFY]</h2>
        <span className="mono" style={{ color: "var(--hud-neon-yellow)" }}>SCORE: {score}</span>
      </div>

      <motion.div ref={ConstraintsRef} style={{ padding: "20px" }}>
        <motion.div drag dragConstraints={ConstraintsRef} style={{ cursor: "grab", display: "inline-block", border: "1px dashed var(--hud-cyan)", padding: "20px", background: "rgba(0,243,255,0.05)" }}>
          {pokemon && <Pokemon pokemon={pokemon} />}
        </motion.div>
        
        <div style={{ margin: "20px 0" }}>
          <h1 className="mono" style={{ letterSpacing: "5px", color: "var(--text-primary)" }}>{pokename.toUpperCase()}</h1>
          <button 
            type="button" 
            onClick={handleHintPress}
            className="mono"
            style={{ marginTop: "10px", background: "transparent", border: "1px solid var(--hud-neon-yellow)", color: "var(--hud-neon-yellow)", padding: "5px 15px", cursor: "pointer" }}
          >
            REQUEST HINT
          </button>
        </div>

        <form onSubmit={handleGuessSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="ENTER ENTITY NAME"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="mono"
            style={{ 
              background: "transparent", 
              border: "1px solid var(--hud-cyan)", 
              color: "var(--hud-cyan)", 
              padding: "10px", 
              width: "80%", 
              textAlign: "center",
              outline: "none"
            }}
          />
          <button 
            type="submit"
            className="mono"
            style={{ background: "var(--hud-cyan)", border: "none", color: "#000", padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}
          >
            EXECUTE SCAN
          </button>
        </form>

        <p className="mono" style={{ marginTop: "20px", color: message.includes("INCORRECT") ? "var(--hud-red)" : "var(--hud-cyan)" }}>
          {message}
        </p>

        <a href="#Battle" style={{ textDecoration: "none" }}>
          <p className="mono" style={{ marginTop: "30px", color: "var(--text-secondary)", fontSize: "12px", cursor: "pointer" }}>
            <FaHandPointDown /> SWITCH TO COMBAT SIMULATOR
          </p>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default PokemonPage;
