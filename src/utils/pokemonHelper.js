import { POKEMON_ASSETS } from "../constants/pokemon";

export const getPokemonImageUrl = (id, imageType) => {
  const baseUrl = POKEMON_ASSETS[imageType];

  return `${baseUrl}${id}.png`;
}

export const getPokemonCries = (id) => {
  return new Audio(`${POKEMON_ASSETS.CRY}${id}.ogg`);
}