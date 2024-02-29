import { Pokemons } from "./types";

export const loadPokemons = async (): Promise<Pokemons> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50");

    if (!response.ok) {
      return Promise.reject(new Error(response.statusText));
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    return Promise.reject(error);
  }
};
