import React from "react";
import styled from "styled-components";
import { useFamilyStore } from "../stores/FamilyStore";

const FamilySelector = ({ selectedCategories, onToggle }) => {
  // FamilyStore에서 데이터 가져오기
  const familyProfiles = useFamilyStore((state) => state.profiles);

  return (
    <CategoryContainer>
      {familyProfiles.map((profile) => (
        <CategoryButton
          key={profile.userid}
          $isSelected={selectedCategories.includes(profile.nickname)}
          onClick={() => onToggle(profile.nickname)}
        >
          <CharacterImage
            src={profile.characterImage}
            alt={`${profile.nickname}의 캐릭터`}
          />
          {profile.nickname}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default FamilySelector;

// 스타일 컴포넌트
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
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const CharacterImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;
