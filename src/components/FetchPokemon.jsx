import React from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (name) => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  const responseJson = await response.json();
  return responseJson;
};

export const getPokemonList = async (total) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${total}`);
  const responseJson = await response.json();
  return responseJson.results;
};
