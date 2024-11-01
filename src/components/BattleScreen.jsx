import React from "react";
import BattleLog from "./BattleLog";
import Pokemon from "../components/Pokemon";

const BattleScreen = ({ playerPokemon, opponentPokemon, onBattleEnd }) => {
  console.log("player pokemon" + playerPokemon);
  console.log("opponent pokemon" + opponentPokemon);
  const [playerHp, setPlayerHp] = React.useState(
    playerPokemon.stats[0].base_stat
  );
  console.log(playerHp);
  const [opponentHp, setOpponentHp] = React.useState(
    opponentPokemon.stats[0].base_stat
  );
  console.log(opponentHp);
  const [battleLog, setBattleLog] = React.useState([]);
  const [playerTurn, setPlayerTurn] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);

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
      const damage = calculateDamage(playerPokemon, opponentPokemon);
      setOpponentHp((hp) => Math.max(0, hp - damage));
      setBattleLog((log) => [
        ...log,
        `${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`,
      ]);
      setMessage(
        `${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
      setCountdown(5);
    } else {
      setMessage("");
      // Opponent's turn to attack
      const damage = calculateDamage(opponentPokemon, playerPokemon);
      setPlayerHp((hp) => Math.max(0, hp - damage));
      setBattleLog((log) => [
        ...log,
        `${opponentPokemon.name} dealt ${damage} damage to Player's ${playerPokemon.name}!`,
      ]);
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
      const damage = calculatespecialDamage(playerPokemon, opponentPokemon);
      setOpponentHp((hp) => Math.max(0, hp - damage));
      setBattleLog((log) => [
        ...log,
        `Special Attack ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`,
      ]);
      setMessage(
        `Special Attack ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
      setCountdown(5);
    } else {
      setMessage("");
      // Opponent's turn to attack
      const damage = calculateDamage(opponentPokemon, playerPokemon);
      setPlayerHp((hp) => Math.max(0, hp - damage));
      setBattleLog((log) => [
        ...log,
        `Special Attack ${opponentPokemon.name} dealt ${damage} damage to Player's ${playerPokemon.name}!`,
      ]);
      setMessage(
        `Special Attack ${opponentPokemon.name} dealt ${damage} damage to Opponent's ${playerPokemon.name}!`
      );
    }
    setPlayerTurn(!playerTurn);
  };

  React.useEffect(() => {
    if (playerHp === 0 || opponentHp === 0) {
      const winner = playerHp === 0 ? opponentPokemon.name : playerPokemon.name;
      setBattleLog(() => [...log, `Battle ended! ${winner} wins`]);
      const batMessage = `Battle ended! ${winner} wins`;
      onBattleEnd(batMessage);
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
        <div className="player-pokemon">
          <Pokemon pokemon={playerPokemon} />
          <p>
            Player's {playerPokemon.name}: {playerHp} HP
          </p>
        </div>
        <div className="enemy-pokemon">
          <Pokemon pokemon={opponentPokemon} />
          <p>
            Opponent's {opponentPokemon.name}: {opponentHp} HP
          </p>
        </div>
      </div>
      <button onClick={attack} disabled={playerHp === 0 || opponentHp === 0 || !playerTurn}>
        {playerTurn ? `Attack with ${playerPokemon.name}` : "Opponent's Turn"}
      </button>
      <button
        onClick={specialAttack}
        disabled={playerHp === 0 || opponentHp === 0 || !playerTurn}
      >
        {playerTurn
          ? `Sp Attack with ${playerPokemon.name}`
          : "Opponent's Turn"}
      </button>
      <p>{message}</p>
      <BattleLog log={battleLog} />
    </div>
  );
};

export default BattleScreen;
