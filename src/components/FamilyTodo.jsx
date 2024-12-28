import React, { useState, useEffect } from "react";
import useHouseworkTagStore from "../stores/HouseworkTagStore";

import styled, { createGlobalStyle } from "styled-components";
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
const FamilyTodo = ({
  houseworkID,
  categoryName,
  houseworkPlace,
  houseworkDetail,
  houseworkDone,
  nickname,
  userCharacter,
}) => {
  const [tagValue, setTagValue] = useState(""); // 초기값 빈 문자열
  const houseworkTag = useHouseworkTagStore((state) => state.houseworkTag);
  useEffect(() => {
    if (houseworkTag[categoryName]) {
      setTagValue(houseworkTag[categoryName]); // 유효한 태그 값 설정
    } else {
      setTagValue("유효하지 않은 태그입니다."); // 유효하지 않은 태그 처리
    }
  }, [categoryName, houseworkTag]);

  return (
    <Container>
      <GlobalStyle />
      <Img src={characterImages[userCharacter]} alt="프로필사진" />
      <Wrapper>
        <NameWrapper>
          <Name>{nickname}</Name>
          <FinishBtn houseworkDone={houseworkDone}>
            {houseworkDone ? "완료" : "미완료"}
          </FinishBtn>
        </NameWrapper>
        <CategoryWrapper>
          <Category>{tagValue}</Category>
          {/* houseworkPlace와 houseworkDetail 값이 "미정"이 아닌 경우만 렌더링 */}
          {houseworkPlace !== "미정" && <Category>{houseworkPlace}</Category>}
          {houseworkDetail !== "미정" && <Category>{houseworkDetail}</Category>}
        </CategoryWrapper>
      </Wrapper>
    </Container>
  );
};

export default FamilyTodo;

// 스타일 정의
const GlobalStyle = createGlobalStyle``;

const Container = styled.div`
  display: flex;
  padding: 20px 24px;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  margin-top: 12px;
  border-radius: 11px;
  background: #fff;
  flex-direction: row;
`;

const Category = styled.div`
  color: var(--key_purple, #aa91e8);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid var(--key_purple, #aa91e8);
`;

const Img = styled.img`
  width: 46px;
  height: 46px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FinishBtn = styled.div`
  display: flex;
  width: 40px;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${({ isDone }) =>
    isDone ? "var(--key_purple, #aa91e8)" : "#bebebe"};
  color: var(--white, #f2f2f2);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const NoFinishBtn = styled.div`
  display: flex;
  width: 50px;
  height: 24px;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #bebebe;
  color: var(--white, #f2f2f2);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
