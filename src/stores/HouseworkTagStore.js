import { create } from "zustand";

const houseworkTag = {
  1: "빨래",
  2: "설거지",
  3: "청소",
  4: "생필품 구매",
  5: "쓰레기 버리기",
  6: "분리수거",
  7: "요리",
  8: "식물 관리",
  9: "반려동물 관리",
};

// HouseworkTagStore.js

const useHouseworkTagStore = create((set) => ({
  houseworkTag,
  houseworkPlace: "",
  houseworkDetail: "",
  houseworkId: null, // houseworkId 추가
  selectedTag: null,
  signupSelectedTag: null, // SignupBestWorkPage에서 사용
  setHouseworkPlace: (place) => set({ houseworkPlace: place }),
  setHouseworkDetail: (detail) => set({ houseworkDetail: detail }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setHouseworkId: (houseworkId) => set({ houseworkId }), // 수정된 부분
  setSignupSelectedTag: (tag) => set({ signupSelectedTag: tag }),
}));

export default useHouseworkTagStore;
