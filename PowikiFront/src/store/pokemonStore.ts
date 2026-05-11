import { create } from "zustand";
import api from "../api/axiosInstance";
import { PokemonListData } from "../types/Pokemon";
import { POKEMON_ASSETS } from "../constants/pokemon";

type imageType = keyof typeof POKEMON_ASSETS;

interface PokemonState {
  // 데이터 상태
  pokemonListData: PokemonListData[]
  hasFetched: boolean,

  // 검색 및 필터 상태
  isPixel: boolean;
  keyword: string;
  selectedTypes: number[];
  currentGen: number;
  formType: string;
  imageType: imageType

  // 함수
  fetchOnes: () => Promise<void>;
  togglePixel: () => void;
  handleKeyword: (value: string) => void;
  handleType: (type: number) => void;
  handleGen: (gen: number) => void;
  handleFormType: (value: string) => void;
  handleImageType: (value: imageType) => void;
}

export const usePokemonStore = create<PokemonState>((set, get) => ({

  // 1. 포켓몬 데이터
  pokemonListData: [],
  hasFetched: false,

  // 2. 검색 및 필터 상태
  isPixel: false,
  keyword: "",
  selectedTypes: [],
  currentGen: 0,
  formType: "default",
  imageType: "ARTWORK",

  // 포켓몬 데이터 불러오기
  fetchOnes: async () => {
    if (get().hasFetched) return;
    
    try {
      const response = await api.get(`/api/pokemons`);
      set({ pokemonListData: response.data.data, hasFetched: true });
    } catch (error) {
      console.error("포켓몬 리스트 불러오기 실패:", error);
    } 
  },

  // 픽셀 모드 토글 
  togglePixel: () => {
    const nextValue = !get().isPixel;
    set({ 
      isPixel: nextValue,
      imageType: nextValue ? "PIXEL" : "ARTWORK"
    });
  },

  // 검색어 변경
  handleKeyword: (value: string) => set({ keyword: value }),

  // 타입 필터 토글
  handleType: (type: number) => {
    const selectedTypes = get().selectedTypes;
    set({
      selectedTypes: selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    });
  },

  // 세대 필터 변경
  handleGen: (gen: number) => set((state) => ({
    currentGen: state.currentGen === gen ? 0 : gen
  })),

  // 폼 타입(탭) 변경
  handleFormType: (value: string) => set({ formType: value }),

  // 이미지 타입 직접 변경 (필요 시)
  handleImageType: (value: imageType) => set({ imageType: value }),

})); 