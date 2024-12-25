import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import instance from "../api/axios";
import useImageStore from "../stores/ImageStore";

import Delete from "../images/Delete.svg";

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

const FamilyList = ({ family }) => {
  return (
    <>
      <GlobalStyle />
      {family.map((member, index) => (
        <Container2 key={index}>
          <Wrapper2>
            <Img
              src={characterImages[member.character]}
              alt="Family Character"
            />
            <NameWrapper>
              <Name>{member.nickname}</Name>
            </NameWrapper>
          </Wrapper2>
          <DeleteImg src={Delete} alt="삭제 버튼" />
        </Container2>
      ))}
    </>
  );
};

export default FamilyList;

const GlobalStyle = createGlobalStyle`

`;

const Container2 = styled.div`
  display: flex;
  padding: 20px 24px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  margin-top: 12px;
  border-radius: 11px;
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 46px;
  height: 46px;
`;

const DeleteImg = styled.img`
  width: 24px;
  height: 24px;
`;

const Wrapper2 = styled.div`
  display: flex;
  gap: 21px;
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
