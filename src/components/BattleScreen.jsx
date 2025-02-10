import React from "react";
import Pokemon from "../components/Pokemon";
import HpBar from "./HpBar";
import { motion } from "framer-motion";

const BattleScreen = ({ playerPokemon, opponentPokemon, onBattleEnd }) => {
  const [playerHp, setPlayerHp] = React.useState(
    playerPokemon.stats[0].base_stat
  );
  const [opponentHp, setOpponentHp] = React.useState(
    opponentPokemon.stats[0].base_stat
  );
  const playerMaxHp = playerPokemon.stats[0].base_stat;
  const opponentMaxHp = opponentPokemon.stats[0].base_stat;
  const [playerTurn, setPlayerTurn] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);

  const playerRef = React.useRef(null);
  const opponentRef = React.useRef(null);

  const applyShake = (ref) => {
    if (ref.current) {
      ref.current.classList.add("shake");
      setTimeout(() => ref.current.classList.remove("shake"), 500);
    }
  };

  const applyJump = (ref) => {
    if (ref.current) {
      ref.current.classList.add("jump");
      setTimeout(() => ref.current.classList.remove("jump"), 500);
    }
  }

  const calculateDamage = (attacker, defender) => {
    const attack = attacker.stats[1].base_stat;
    const defense = defender.stats[2].base_stat;
    return Math.max(1, attack - defense);
  };
  const calculatespecialDamage = (attacker, defender) => {
    const attack = attacker.stats[3].base_stat;
    const defense = defender.stats[2].base_stat;
    return Math.max(1, attack - defense);
  };

  const attack = () => {
    if (playerTurn) {
      setMessage("");
      // Player's turn to attack
      applyJump(playerRef);
      const damage = calculateDamage(playerPokemon, opponentPokemon);
      setOpponentHp((hp) => Math.max(0, hp - damage));
      applyShake(opponentRef);
      setMessage(
        `${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
      setCountdown(3);
    } else {
      setMessage("");
      // Opponent's turn to attack
      applyJump(opponentRef);
      const damage = calculateDamage(opponentPokemon, playerPokemon);
      setPlayerHp((hp) => Math.max(0, hp - damage));
      applyShake(playerRef);
      setMessage(
        `${opponentPokemon.name} dealt ${damage} damage to Opponent's ${playerPokemon.name}!`
      );
    }
    setPlayerTurn(!playerTurn);
  };

  const specialAttack = () => {
    if (playerTurn) {
      setMessage("");
      // Player's turn to attack
      applyJump(playerRef);
      const damage = calculatespecialDamage(playerPokemon, opponentPokemon);
      setOpponentHp((hp) => Math.max(0, hp - damage));
      applyShake(opponentRef);
      setMessage(
        `Special Attack ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
      setCountdown(3);
    } else {
      setMessage("");
      // Opponent's turn to attack
      applyJump(opponentRef);
      const damage = calculateDamage(opponentPokemon, playerPokemon);
      setPlayerHp((hp) => Math.max(0, hp - damage));
      applyShake(playerRef);
      setMessage(
        `Special Attack ${opponentPokemon.name} dealt ${damage} damage to Opponent's ${playerPokemon.name}!`
      );
    }
    setPlayerTurn(!playerTurn);
  };

  const UltimateAttack = () => {
      setMessage("");
      // Player's turn to attack
      applyJump(playerRef);
      const damage = 100;
      setOpponentHp((hp) => Math.max(0, hp - damage));
      applyShake(opponentRef);
      setMessage(
        `Ultimate Attack ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
      setCountdown(3);
    setPlayerTurn(!playerTurn);
  }

  React.useEffect(() => {
    if (playerHp === 0 || opponentHp === 0) {
      const winner = playerHp === 0 ? opponentPokemon : playerPokemon;
      const batMessage = `Battle ended! ${winner.name} wins`;
      const timer = setTimeout(() => {
        onBattleEnd(batMessage, winner);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [
    playerHp,
    opponentHp,
    onBattleEnd,
    playerPokemon.name,
    opponentPokemon.name,
  ]);

  React.useEffect(() => {
    if (!playerTurn && playerHp > 0 && opponentHp > 0 && countdown == 0) {
      const opponentAttack = Math.random() < 0.05 ? specialAttack : attack;
      opponentAttack();
    }
  }, [playerTurn, playerHp, opponentHp, attack, specialAttack]);

  React.useEffect(() => {
    if (countdown === 0) return;
    const time = setInterval(() => {
      setCountdown((prevCountDown) => prevCountDown - 1);
    }, 1000);

    return () => clearInterval(time);
  }, [countdown]);

  return (
    <div className="battle-screen">
      <h2>Battle Screen</h2>
      <p>{countdown}</p>
      <div className="players">
        <motion.div
          className="row-enemy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
          }}
        >
          <div className="empty"></div>
          <div className="enemy-pokemon">
            <img
              ref={opponentRef}
              src={opponentPokemon.sprites.front_default}
              alt={opponentPokemon.name}
            />
            <HpBar currentHp={opponentHp} maxHp={opponentMaxHp} />
          </div>
        </motion.div>
        <motion.div
          className="row-player"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 1,
          }}
        >
          <div className="player-pokemon">
            <img
              ref={playerRef}
              src={playerPokemon.sprites.back_default}
              alt={playerPokemon.name}
            />
            <HpBar currentHp={playerHp} maxHp={playerMaxHp} />
          </div>
          <div className="empty"></div>
        </motion.div>
      </div>
      <div className="att-button">
        <button
          onClick={attack}
          disabled={playerHp === 0 || opponentHp === 0 || !playerTurn}
        >
          {playerTurn ? `Normal Attack` : "Opponent's Turn"}
        </button>
        <button
          onClick={specialAttack}
          disabled={playerHp === 0 || opponentHp === 0 || !playerTurn}
        >
          {playerTurn ? `Sp Attack` : "Opponent's Turn"}
        </button>

        <button
          onClick={UltimateAttack}
          disabled={playerHp === 0 || opponentHp === 0 || !playerTurn}
        >
          {playerTurn ? `Ult Attack` : "Opponent's Turn"}
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default BattleScreen;
