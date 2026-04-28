import { create } from "zustand";
import api from "../api/axiosInstance";

export const usePokemonStore = create((set, get) => ({

  // 1. 포켓몬 데이터
  pokemonData: [],
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
      set({ pokemonData: response.data.data, hasFetched: true });
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
  handleKeyword: (value) => set({ keyword: value }),

  // 타입 필터 토글
  handleType: (type) => {
    const selectedTypes = get().selectedTypes;
    set({
      selectedTypes: selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    });
  },

  // 세대 필터 변경
  handleGen: (gen) => set((state) => ({
    currentGen: state.currentGen === gen ? 0 : gen
  })),

  // 폼 타입(탭) 변경
  handleFormType: (value) => set({ formType: value }),

  // 이미지 타입 직접 변경 (필요 시)
  handleImageType: (value) => set({ imageType: value }),

})); 