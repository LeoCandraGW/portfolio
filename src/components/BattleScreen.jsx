import React from "react";
import HpBar from "./HpBar";
import { motion, AnimatePresence } from "framer-motion";

const BattleScreen = ({ playerPokemon, opponentPokemon, onBattleEnd }) => {
  const getStat = (pokemon, statName) => pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 50;

  const playerStats = {
    hp: getStat(playerPokemon, "hp") * 2, // Multiply by 2 for longer battles
    attack: getStat(playerPokemon, "attack"),
    defense: getStat(playerPokemon, "defense"),
    speed: getStat(playerPokemon, "speed"),
  };

  const oppStats = {
    hp: getStat(opponentPokemon, "hp") * 2,
    attack: getStat(opponentPokemon, "attack"),
    defense: getStat(opponentPokemon, "defense"),
    speed: getStat(opponentPokemon, "speed"),
  };

  const [playerHp, setPlayerHp] = React.useState(playerStats.hp);
  const [opponentHp, setOpponentHp] = React.useState(oppStats.hp);
  const [playerTurn, setPlayerTurn] = React.useState(playerStats.speed >= oppStats.speed);
  
  const [combatLog, setCombatLog] = React.useState([`> INITIALIZING COMBAT SIMULATION...`, `> ${playerPokemon.name.toUpperCase()} VS ${opponentPokemon.name.toUpperCase()}`]);
  
  // Extract 4 random moves
  const [playerMoves, setPlayerMoves] = React.useState([]);
  
  React.useEffect(() => {
    // Pick 4 random moves from the vast moves array
    const moves = [...playerPokemon.moves].sort(() => 0.5 - Math.random()).slice(0, 4);
    setPlayerMoves(moves.map(m => ({
      name: m.move.name.replace("-", " ").toUpperCase(),
      power: Math.floor(Math.random() * 60) + 40 // Simulated power 40-100
    })));
  }, [playerPokemon]);

  const [animatingPlayer, setAnimatingPlayer] = React.useState(false);
  const [animatingOpponent, setAnimatingOpponent] = React.useState(false);

  const addLog = (msg) => {
    setCombatLog(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const executeAttack = (attacker, defender, moveName, power, isPlayerAttack) => {
    const damage = Math.max(1, Math.floor(((power * attacker.attack) / defender.defense) * (Math.random() * 0.4 + 0.8)));
    
    addLog(`${isPlayerAttack ? playerPokemon.name.toUpperCase() : opponentPokemon.name.toUpperCase()} EXECUTES [${moveName}]`);
    addLog(`IMPACT REGISTERED: -${damage} INTEGRITY`);

    if (isPlayerAttack) {
      setAnimatingPlayer(true);
      setTimeout(() => setAnimatingPlayer(false), 300);
      setOpponentHp(hp => Math.max(0, hp - damage));
    } else {
      setAnimatingOpponent(true);
      setTimeout(() => setAnimatingOpponent(false), 300);
      setPlayerHp(hp => Math.max(0, hp - damage));
    }
  };

  const handlePlayerMove = (move) => {
    if (!playerTurn) return;
    executeAttack(playerStats, oppStats, move.name, move.power, true);
    setPlayerTurn(false);
  };

  React.useEffect(() => {
    if (playerHp === 0 || opponentHp === 0) {
      const winner = playerHp === 0 ? opponentPokemon : playerPokemon;
      const batMessage = playerHp === 0 ? "SIMULATION FAILED. TARGET DESTROYED." : "VICTORY SECURED. TARGET ELIMINATED.";
      addLog(batMessage);
      setTimeout(() => onBattleEnd(batMessage, winner), 2500);
      return;
    }

    if (!playerTurn && playerHp > 0 && opponentHp > 0) {
      // Opponent AI (Wait 1.5s then attack)
      const timer = setTimeout(() => {
        const oppMoves = opponentPokemon.moves;
        const randomMove = oppMoves[Math.floor(Math.random() * oppMoves.length)].move.name.replace("-", " ").toUpperCase();
        const randomPower = Math.floor(Math.random() * 60) + 40;
        executeAttack(oppStats, playerStats, randomMove, randomPower, false);
        setPlayerTurn(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [playerTurn, playerHp, opponentHp]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* COMBAT ARENA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--hud-cyan)", padding: "20px", background: "rgba(0,0,0,0.4)" }}>
        
        <motion.div 
          animate={animatingPlayer ? { x: [0, 20, -20, 0], filter: "brightness(2)" } : {}}
          style={{ width: "40%", textAlign: "center" }}
        >
          <span className="mono" style={{ color: "var(--hud-cyan)", textTransform: "uppercase" }}>{playerPokemon.name}</span>
          <HpBar currentHp={playerHp} maxHp={playerStats.hp} />
          <img 
            src={playerPokemon.sprites.back_default || playerPokemon.sprites.front_default} 
            alt={playerPokemon.name} 
            style={{ width: "120px", filter: "drop-shadow(0 0 10px var(--hud-cyan))" }} 
          />
        </motion.div>

        <div className="mono" style={{ color: "var(--hud-red)", fontSize: "24px", animation: "blink 1s infinite" }}>VS</div>

        <motion.div 
          animate={animatingOpponent ? { x: [0, -20, 20, 0], filter: "brightness(2) hue-rotate(90deg)" } : {}}
          style={{ width: "40%", textAlign: "center" }}
        >
          <span className="mono" style={{ color: "var(--hud-red)", textTransform: "uppercase" }}>{opponentPokemon.name}</span>
          <HpBar currentHp={opponentHp} maxHp={oppStats.hp} />
          <img 
            src={opponentPokemon.sprites.front_default} 
            alt={opponentPokemon.name} 
            style={{ width: "120px", filter: "drop-shadow(0 0 10px var(--hud-red))" }} 
          />
        </motion.div>
      </div>

      {/* COMBAT LOG */}
      <div style={{ border: "1px dashed var(--hud-neon-yellow)", padding: "10px", height: "100px", overflow: "hidden", background: "rgba(255, 255, 0, 0.05)" }}>
        <AnimatePresence>
          {combatLog.map((log, i) => (
            <motion.p 
              key={i} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="mono" 
              style={{ color: "var(--hud-neon-yellow)", margin: "5px 0", fontSize: "12px" }}
            >
              {log}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* COMMAND INTERFACE */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {playerMoves.map((move, i) => (
          <button
            key={i}
            onClick={() => handlePlayerMove(move)}
            disabled={!playerTurn || playerHp === 0 || opponentHp === 0}
            className="mono"
            style={{
              padding: "15px",
              background: playerTurn ? "rgba(0, 243, 255, 0.1)" : "rgba(100, 100, 100, 0.1)",
              border: `1px solid ${playerTurn ? "var(--hud-cyan)" : "#555"}`,
              color: playerTurn ? "var(--hud-cyan)" : "#555",
              cursor: playerTurn ? "pointer" : "not-allowed",
              textTransform: "uppercase",
              fontSize: "14px"
            }}
          >
            EXECUTE: {move.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BattleScreen;
