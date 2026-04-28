
// 포켓몬 타입
export interface PokemonType {
  id: number
  slot: number
  name: string
  color: string
  sprite: string,
}

// 포켓몬 특성
export interface Ability {
  id: number;
  name: string;
  description: string;
  isHidden: boolean;
  slot: number;
}

// 타입 상성 배율
export interface TypeEfficacy {
  [key: string]: {
    id: number;
    name: string;
    factor: number;
    color: string;
  }[];
}

 // 포켓몬 리스트
 export interface PokemonListData {
  id: number
  pokemonSpeciesId: number
  name: string
  generation: number
  formType?: string
  types: PokemonType[]
  legendary: boolean
  mythical: boolean
}

// 포켓몬 상세 정보
export interface PokemonDetailData {
  id: number;
  pokemonSpeciesId: number;
  name: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    total: number;
  };
  gender: {
    male: number;
    female: number;
    genderless: boolean;
  };
  height: number;
  weight: number;
  category: string;
  description: string;
  prev: { id: number; name: string } 
  next: { id: number; name: string } 
  eggGroups: string[];
  types: PokemonType[],
  abilities: Ability[],
  typeEfficacy: TypeEfficacy; 
}