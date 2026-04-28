import { POKEMON_ASSETS } from "../constants/pokemon";

type ImageType = keyof typeof POKEMON_ASSETS;
export const getPokemonImageUrl = (id:number, imageType:ImageType) => {
  const baseUrl = POKEMON_ASSETS[imageType];

  return `${baseUrl}${id}.png`;
}

export const getPokemonCries = (id:number) => {
  return new Audio(`${POKEMON_ASSETS.CRY}${id}.ogg`);
}