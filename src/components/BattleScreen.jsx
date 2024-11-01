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

  const calculateDamage = (attacker, defender) => {
    const attack = attacker.stats[1].base_stat;
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
        `Player's ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`,
      ]);
      setMessage(
        `Player's ${playerPokemon.name} dealt ${damage} damage to Opponent's ${opponentPokemon.name}!`
      );
    } else {
      setMessage("");
      // Opponent's turn to attack
      const damage = calculateDamage(opponentPokemon, playerPokemon);
      setPlayerHp((hp) => Math.max(0, hp - damage));
      setBattleLog((log) => [
        ...log,
        `Opponent's ${opponentPokemon.name} dealt ${damage} damage to Player's ${playerPokemon.name}!`,
      ]);
      setMessage(
        `Player's ${opponentPokemon.name} dealt ${damage} damage to Opponent's ${playerPokemon.name}!`
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

  return (
    <div className="battle-screen">
      <h2>Battle Screen</h2>
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
      <button onClick={attack} disabled={playerHp === 0 || opponentHp === 0}>
        {playerTurn ? `Attack with ${playerPokemon.name}` : "Opponent's Turn"}
      </button>
      <p>{message}</p>
      <BattleLog log={battleLog} />
    </div>
  );
};

export default BattleScreen;
