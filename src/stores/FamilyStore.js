import { create } from "zustand";
import userCharacter1Img from "../images/character/프사피부미인.svg";
import userCharacter2Img from "../images/character/프사머리숱부자.svg";
import userCharacter3Img from "../images/character/프사핑크수집가.svg";
import userCharacter4Img from "../images/character/프사고민해결사.svg";
import userCharacter5Img from "../images/character/프사매듭의달인.svg";

const characterImages = {
  1: userCharacter1Img,
  2: userCharacter2Img,
  3: userCharacter3Img,
  4: userCharacter4Img,
  5: userCharacter5Img,
};

export const useFamilyStore = create((set) => ({
  profiles: [],
  error: null,
  mockData: [
    {
      userid: 3802404801,
      nickname: "이정은",
      userCharacter: 1,
      characterImage: characterImages[1],
    },
    {
      userid: 3802404802,
      nickname: "김철수",
      userCharacter: 2,
      characterImage: characterImages[2],
    },
  ],
  fetchProfiles: async () => {
    try {
      const response = await fetch("/mypage/member/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.housemembers) {
          const profiles = data.housemembers.map((member) => ({
            userid: member.userid,
            nickname: member.nickname,
            characterImage: characterImages[member.userCharacter],
          }));
          set({ profiles, error: null });
        } else {
          set({ error: "No family members found." });
        }
      } else {
        const errorData = await response.json();
        set({ error: errorData.detail || errorData.error || "Unknown error." });
        set({ profiles: [] });
      }
    } catch (error) {
      set({
        error: "Failed to fetch data. Using mock data instead.",
        profiles: useFamilyStore.getState().mockData,
      });
    }
  },
}));
