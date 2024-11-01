import React from "react";
import BattleScreen from "../components/BattleScreen";
import { getPokemon } from "../components/FetchPokemon";
import SelectionScreen from "../components/SelectionScreen";
import "../styles/pokebattle.css";

function BattlePokemonPage() {
  const [playerPokemon, setPlayerPokemon] = React.useState(null);
  const [opponentPokemon, setOpponentPokemon] = React.useState(null);
  const [battleEnded, setBattleEnded] = React.useState(false);
  const [battleMessage, setBattleMessage] = React.useState("");

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

  const handleBattleFieldEnd = (batMessage) => {
    setBattleEnded(true);
    setBattleMessage(batMessage);
  };

  const resetBattle = () => {
    setPlayerPokemon(null);
    setOpponentPokemon(null);
    setBattleEnded(false);
    setBattleMessage("");
    fetchRandomPokemon();
  };

  return (
    <section className="PokeBattle" id="PokeBattle">
      <div className="pokebattle-page">
        <h1>pokemon Battle Simulator</h1>
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
          <>
            <p>{battleMessage}</p>
            <button onClick={resetBattle} className="play-again-button">
              Play Again
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default BattlePokemonPage;
