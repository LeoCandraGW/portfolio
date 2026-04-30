import React from "react";
import { getPokemon, getPokemonList } from "./FetchPokemon";
import { motion } from "framer-motion";
import { IoIosAddCircleOutline } from "react-icons/io";

const SelectionScreen = ({ onSelect }) => {
  const [pokemon, setPokemon] = React.useState([]);
  const [total, setTotal] = React.useState(12);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPokemonListWithDetails = async () => {
      setLoading(true);
      try {
        const pokemonList = await getPokemonList(total);
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (poke) => {
            const response = await fetch(poke.url);
            return await response.json();
          })
        );
        setPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
      setLoading(false);
    };

    fetchPokemonListWithDetails();
  }, [total]);

  const handleSelect = async (pokemonName) => {
    const selectedPokemon = await getPokemon(pokemonName);
    onSelect(selectedPokemon);
  };

  return (
    <div style={{ width: "100%" }}>
      <h3 className="mono" style={{ color: "var(--hud-cyan)", marginBottom: "20px", textAlign: "center" }}>
        {loading ? "> SCANNING SECTOR FOR ENTITIES..." : "> SELECT COMBAT ENTITY"}
      </h3>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "10px",
        maxHeight: "400px",
        overflowY: "auto",
        padding: "10px"
      }}>
        {pokemon.map((poke, i) => (
          <motion.div
            key={poke.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleSelect(poke.name)}
            style={{
              border: "1px solid var(--hud-cyan)",
              background: "rgba(0, 243, 255, 0.05)",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflow: "hidden"
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.2)" }}
          >
            <div className="scanline-overlay" style={{ pointerEvents: "none" }}></div>
            <img 
              src={poke.sprites.front_default} 
              alt={poke.name} 
              style={{ width: "80px", filter: "drop-shadow(0 0 5px var(--hud-cyan))" }} 
            />
            <span className="mono" style={{ fontSize: "10px", color: "var(--hud-neon-yellow)", textTransform: "uppercase" }}>
              {poke.name}
            </span>
            <span className="mono" style={{ fontSize: "8px", color: "var(--hud-cyan)" }}>
              TYPE: {poke.types[0]?.type.name.toUpperCase()}
            </span>
          </motion.div>
        ))}
        
        <motion.div
          onClick={() => setTotal(t => t + 6)}
          style={{
            border: "1px dashed var(--hud-cyan)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "var(--hud-cyan)",
            fontSize: "30px",
            minHeight: "100px"
          }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.1)" }}
        >
          <IoIosAddCircleOutline />
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionScreen;
