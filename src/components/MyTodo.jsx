import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import instance from "../api/axios";
import TodoCategory from "./TodoCategory";
import NoCheck from "../images/NoCheck.svg";
import CheckPurple from "../images/CheckPurple.svg";

const MyTodo = ({ categoryName, removeStyles }) => {
  // 상태 관리: 이미지를 선택했는지 여부
  const [isChecked, setIsChecked] = useState(false);

  // 이미지 클릭 시 상태 토글
  const toggleCheck = () => {
    setIsChecked((prev) => !prev); // 상태를 반전시켜 이미지 변경
  };

  return (
    <>
      <GlobalStyle />
      <Container removeStyles={removeStyles}>
        <Front>
          <Category>{categoryName}</Category>
          <TodoCategory name="거실" />
          <TodoCategory name="물걸레" />
        </Front>

        {/* 이미지 클릭 시 상태 변화에 따라 src 변경 */}
        <Img
          src={isChecked ? CheckPurple : NoCheck}
          alt="Rectangle"
          onClick={toggleCheck} // 클릭 시 toggleCheck 실행
        />
      </Container>
    </>
  );
};

export default MyTodo;

const GlobalStyle = createGlobalStyle``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 11px;
  flex-direction: row;
  gap: 10px;

  /* 기본 스타일 */
  background: ${({ removeStyles }) => (removeStyles ? "none" : "#fff")};
  padding: ${({ removeStyles }) => (removeStyles ? "0" : "16px 20px")};
  margin-top: ${({ removeStyles }) => (removeStyles ? "0" : "12px")};
`;

const Front = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 10px;
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
  width: 24px;
  align-self: stretch;
  cursor: pointer; /* 마우스 포인터를 클릭할 수 있음을 나타냄 */
`;
