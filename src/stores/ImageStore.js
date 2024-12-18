import { create } from "zustand";

import userCharacter1Img from "../images/character/없피부미인.svg";
import userCharacter2Img from "../images/character/없머리숱부자.svg";
import userCharacter3Img from "../images/character/없핑크수집가.svg";
import userCharacter4Img from "../images/character/없고민해결사.svg";
import userCharacter5Img from "../images/character/없매듭의달인.svg";

import profile1Img from "../images/character/프사피부미인.svg";
import profile2Img from "../images/character/프사머리숱부자.svg";
import profile3Img from "../images/character/프사핑크수집가.svg";
import profile4Img from "../images/character/프사고민해결사.svg";
import profile5Img from "../images/character/프사매듭의달인.svg";

import empty1Img from "../images/character/빈피부미인.svg";
import empty2Img from "../images/character/빈머리숱부자.svg";
import empty3Img from "../images/character/빈핑크수집가.svg";
import empty4Img from "../images/character/빈고민해결사.svg";
import empty5Img from "../images/character/빈매듭의달인.svg";

// 아무것도 없는 캐릭터
const characterImages = {
  1: userCharacter1Img,
  2: userCharacter2Img,
  3: userCharacter3Img,
  4: userCharacter4Img,
  5: userCharacter5Img,
};

//캐릭터 프사
const profileImages = {
  1: profile1Img,
  2: profile2Img,
  3: profile3Img,
  4: profile4Img,
  5: profile5Img,
};

//빈 말풍선 캐릭터
const emptyImages = {
  1: empty1Img,
  2: empty2Img,
  3: empty3Img,
  4: empty4Img,
  5: empty5Img,
};

const useImageStore = create((set) => ({
  characterImages,
  profileImages,
  emptyImages,
}));

export default useImageStore;
