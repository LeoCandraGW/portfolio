import React from "react";
import { getPokemon, getPokemonList } from "./FetchPokemon";
import Pokemon from "../components/Pokemon";
import { IoIosAddCircleOutline } from "react-icons/io";
import { WiDayCloudy } from "react-icons/wi";

const SelectionScreen = ({ onSelect }) => {
  const [pokemon, setPokemon] = React.useState([]);
  const [total, setTotal] = React.useState(10);

  React.useEffect(() => {
    const fetchPokemonListWithDetails = async () => {
      try {
        const pokemonList = await getPokemonList(total);
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

    fetchPokemonListWithDetails();
  }, [total]);

  const handleSelect = async (pokemonName) => {
    const selectedPokemon = await getPokemon(pokemonName);
    onSelect(selectedPokemon);
  };

  const handleMore = () => {
    setTotal((prevTotal) => prevTotal + 5);
  };

  return (
    <div className="select-screen">
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
        <button className="more" onClick={handleMore}>
          <IoIosAddCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default SelectionScreen;
