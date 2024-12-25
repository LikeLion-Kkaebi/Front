import { create } from "zustand";
import userCharacter1Img from "../images/character/프사피부미인.svg";
import userCharacter2Img from "../images/character/프사머리숱부자.svg";
import userCharacter3Img from "../images/character/프사핑크수집가.svg";
import userCharacter4Img from "../images/character/프사고민해결사.svg";
import userCharacter5Img from "../images/character/프사매듭의달인.svg";
import instance from "../api/axios";

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
  fetchProfiles: async () => {
    try {
      const token = localStorage.getItem("token");

      // 1. /mypage/user/ 데이터 가져오기
      const userResponse = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}mypage/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = {
        userid: userResponse.data.userid,
        nickname: userResponse.data.nickname,
        characterImage: userResponse.data.userCharacter,
      };

      // 2. /housework/manager/ 데이터 가져오기
      const managerResponse = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}housework/manager/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const houseMembers = managerResponse.data.data?.housemember || [];
      const familyData = houseMembers.map((member) => ({
        userid: member.userid,
        nickname: member.nickname,
        characterImage: member.userCharacter,
      }));

      // 3. 중복 제거 로직
      const allProfiles = [userData, ...familyData];
      const uniqueProfiles = allProfiles.filter(
        (profile, index, self) =>
          index === self.findIndex((p) => p.userid === profile.userid)
      );

      // 4. 상태 업데이트
      set({ profiles: uniqueProfiles, error: null });
    } catch (error) {
      console.error("Error fetching profiles:", error);
      set({ error: "Failed to fetch profiles.", profiles: [] });
    }
  },
}));
