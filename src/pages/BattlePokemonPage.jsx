import React from "react";
import BattleScreen from "../components/BattleScreen";
import { getPokemon } from "../components/FetchPokemon";
import SelectionScreen from "../components/SelectionScreen";
import { motion } from "framer-motion";

function BattlePokemonPage() {
  const [playerPokemon, setPlayerPokemon] = React.useState(null);
  const [opponentPokemon, setOpponentPokemon] = React.useState(null);
  const [battleEnded, setBattleEnded] = React.useState(false);
  const [battleMessage, setBattleMessage] = React.useState("");
  const [winnerPokemon, setWinnerPokemon] = React.useState(null);

  React.useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const responseJson = await response.json();
    setOpponentPokemon(responseJson);
  };

  const handleBattleFieldEnd = (batMessage, winner) => {
    setBattleEnded(true);
    setBattleMessage(batMessage);
    setWinnerPokemon(winner);
  };

  const resetBattle = () => {
    setPlayerPokemon(null);
    setOpponentPokemon(null);
    setBattleEnded(false);
    setBattleMessage("");
    fetchRandomPokemon();
  };

  return (
    <motion.div 
      className="hud-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "800px", width: "95%", marginTop: "100px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--hud-cyan)", paddingBottom: "10px", marginBottom: "20px" }}>
        <h2 className="hud-title" style={{ color: "var(--hud-cyan)" }}>[SIMULATOR: COMBAT]</h2>
        <span className="blink mono" style={{ color: "var(--hud-red)" }}>LIVE COMBAT FEED</span>
      </div>

      <div style={{ padding: "10px" }}>
        {!battleEnded ? (
          !playerPokemon ? (
            <SelectionScreen onSelect={setPlayerPokemon} />
          ) : (
            <BattleScreen
              playerPokemon={playerPokemon}
              opponentPokemon={opponentPokemon}
              onBattleEnd={handleBattleFieldEnd}
            />
          )
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
             <img
              src={winnerPokemon.sprites.front_default}
              alt={winnerPokemon.name}
              style={{ width: "150px", filter: "drop-shadow(0 0 10px var(--hud-neon-yellow))" }}
            />
            <h2 className="mono" style={{ color: "var(--hud-neon-yellow)", margin: "20px 0" }}>{battleMessage}</h2>
            <button 
              onClick={resetBattle} 
              className="mono"
              style={{ background: "var(--hud-cyan)", border: "none", color: "#000", padding: "10px 20px", cursor: "pointer", fontWeight: "bold" }}
            >
              INITIALIZE NEW SIMULATION
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BattlePokemonPage;
