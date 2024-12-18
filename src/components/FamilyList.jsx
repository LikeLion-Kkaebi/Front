import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import instance from "../api/axios";
import TodoCategory from "./TodoCategory";
import NoCheck from "../images/NoCheck.svg";
import CheckPurple from "../images/CheckPurple.svg";
import profile from "../images/RedCircle.svg";
import Delete from "../images/Delete.svg";

const FamilyList = ({}) => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Wrapper>
          <Img src={profile} alt="프로필사진" />
          <NameWrapper>
            <Name>반짝반짝</Name>
          </NameWrapper>
        </Wrapper>
        <DeleteImg src={Delete} alt="삭제 버튼" />
      </Container>
    </>
  );
};

export default FamilyList;

const GlobalStyle = createGlobalStyle`

`;

const Container = styled.div`
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

const Category = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Img = styled.img`
  width: 46px;
  height: 46px;
`;

const DeleteImg = styled.img`
  width: 24px;
  height: 24px;
`;

const Wrapper = styled.div`
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
  background: var(--key_purple, #aa91e8);
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
