import React from "react";
import { getPokemon, getPokemonList } from "./FetchPokemon";
import Pokemon from "../components/Pokemon";

const SelectionScreen = ({ onSelect }) => {
  const [pokemonList, setPokemonList] = React.useState([]);
  const [pokemon, setPokemon] = React.useState([]);

  React.useEffect(() => {
    getPokemonList().then((data) => setPokemonList(data));
  }, []);

  React.useEffect(() => {
    if (pokemonList.length > 0) {
      console.log("Fetching Pokémon details...");
      const fetchPokemonDetails = async () => {
        try {
          const pokemonDetails = await Promise.all(
            pokemonList.map(async (poke) => {
              const response = await fetch(poke.url);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch ${poke.name}: ${response.statusText}`
                );
              }
              return await response.json();
            })
          );
          setPokemon(pokemonDetails);
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      };

      fetchPokemonDetails();
    }
  }, [pokemonList]);

  const handleSelect = async (pokemonName) => {
    const pokemon = await getPokemon(pokemonName);
    onSelect(pokemon);
  };

  return (
    <div  className="select-screen">
      <h2>Select Your Pokemon</h2>
      <div className="pokelist">
        {pokemon.map((poke) => (
          <button key={poke.name} onClick={() => handleSelect(poke.name)}>
            <div className="pokeitem">
              <Pokemon pokemon={poke} />
              {poke.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionScreen;
