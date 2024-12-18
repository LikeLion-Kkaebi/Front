import { create } from "zustand";

const useLevelStore = create((set) => ({
  completionRate: 0, // 진행도 퍼센트
  setCompletionRate: (rate) => set({ completionRate: rate }),
  activeLevel: 0, // 현재 활성화된 레벨
  setActiveLevel: (level) => set({ activeLevel: level }),
  characterImg: null, // 기본 캐릭터 이미지
  setCharacterImg: (img) => set({ characterImg: img }),
}));

export default useLevelStore;
