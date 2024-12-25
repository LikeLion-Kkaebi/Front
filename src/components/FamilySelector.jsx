import React, { useEffect } from "react";
import styled from "styled-components";
import { useFamilyStore } from "../stores/FamilyStore";

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

const FamilySelector = ({ selectedCategories, onToggle }) => {
  const familyProfiles = useFamilyStore((state) => state.profiles);
  const fetchProfiles = useFamilyStore((state) => state.fetchProfiles);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return (
    <CategoryContainer>
      {familyProfiles.map((profile) => (
        <CategoryButton
          key={profile.userid}
          $isSelected={selectedCategories.includes(profile.nickname)}
          onClick={() => onToggle(profile.nickname)}
        >
          <CharacterImage
            src={characterImages[profile.characterImage]}
            alt={`${profile.nickname}의 캐릭터`}
          />
          {profile.nickname}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default FamilySelector;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background-color: #fff;
  color: #787878;
  box-shadow: ${(props) =>
    props.$isSelected ? "0px 0px 7px 0px rgba(170, 145, 232, 0.5)" : "default"};
  font-family: Pretendard;
  font-size: 14px;
  cursor: pointer;
`;

const CharacterImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;
