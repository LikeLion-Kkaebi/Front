import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import instance from "../api/axios";

import NoCheck from "../images/NoCheck.svg";
import CheckPurple from "../images/CheckPurple.svg";
import useHouseworkTagStore from "../stores/HouseworkTagStore";

const MyTodo = ({
  houseworkId,
  categoryName,
  houseworkPlace,
  houseworkDetail,
  houseworkDone,
  removeStyles,
}) => {
  // 상태 관리: 이미지를 선택했는지 여부
  const [isChecked, setIsChecked] = useState(houseworkDone); // 초기값을 houseworkDone으로 설정
  const [tagValue, setTagValue] = useState(""); // 초기값 빈 문자열
  const houseworkTag = useHouseworkTagStore((state) => state.houseworkTag);
  // categoryName 변경될 때 한 번만 실행
  useEffect(() => {
    if (houseworkTag[categoryName]) {
      setTagValue(houseworkTag[categoryName]); // 유효한 태그 값 설정
    } else {
      setTagValue("유효하지 않은 태그입니다."); // 유효하지 않은 태그 처리
    }
  }, [categoryName, houseworkTag]);

  // 이미지 클릭 시 상태 토글
  const toggleCheck = async () => {
    setIsChecked((prev) => !prev); // 상태를 반전시켜 이미지 변경
    const token = localStorage.getItem("token");

    try {
      const response = await instance.put(
        `${process.env.REACT_APP_SERVER_PORT}calendar/houseworkDone/`,
        {
          houseworkId: houseworkId, // houseworkID를 요청 본문에 포함
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("API 요청 성공:", response.data);
        // 상태 변경 성공 후 isChecked 상태 업데이트
        setIsChecked(response.data.data.houseworkDone); // 응답에 맞게 isChecked 업데이트
      } else {
        console.error("API 요청 실패:", response.status);
      }
    } catch (error) {
      console.log(houseworkId);
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container removeStyles={removeStyles}>
        <Front>
          <Category>{tagValue}</Category>
          {/* houseworkPlace와 houseworkDetail 값이 "미정"이 아닌 경우만 렌더링 */}
          {houseworkPlace !== "미정" && (
            <TodoCategory>{houseworkPlace}</TodoCategory>
          )}
          {houseworkDetail !== "미정" && (
            <TodoCategory>{houseworkDetail}</TodoCategory>
          )}
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

const TodoCategory = styled.div`
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
