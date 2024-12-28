import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import GlobalStyle from "../../style/GlobalStyle";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";
import BackHeader from "../../components/BackHeader";
import useHouseworkTagStore from "../../stores/HouseworkTagStore";

import instance from "axios";

const WhatTodoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [houseworkId, setHouseworkId] = useState(null);

  const [name, setName] = useState(""); // 입력값 상태 관리

  const setHouseworkDetail = useHouseworkTagStore(
    (state) => state.setHouseworkDetail
  ); // Zustand 상태 업데이트 함수 가져오기

  const houseworkPlace = useHouseworkTagStore((state) => state.houseworkPlace);
  const houseworkDetail = useHouseworkTagStore(
    (state) => state.houseworkDetail
  );
  const selectedTag = useHouseworkTagStore((state) => state.selectedTag);

  // URL에서 쿼리스트링으로 전달된 데이터를 가져옴
  const queryYear = searchParams.get("year");
  const queryMonth = searchParams.get("month");
  const queryDay = searchParams.get("date");

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue); // 입력값 상태 업데이트
  };
  const houseworkDate = `${queryYear}-${queryMonth}-${queryDay}`;
  console.log("날짜:", houseworkDate);
  // Zustand 상태 가져오기 (최적화)
  // 다음 버튼 클릭 핸들러
  const handleNextClick = () => {
    setHouseworkDetail(name); // Zustand 스토어에 입력값 저장 (비어 있어도 문제 없음)
    // 다음 페이지로 이동
    handleConfirmClick();
  };

  const handleConfirmClick = async () => {
    const payload = {
      houseworkPlace: houseworkPlace || "미정",
      houseworkDetail: houseworkDetail || "미정",
      houseworkDate: houseworkDate,
      tag: selectedTag,
    };

    console.log("POST 데이터:", payload);

    try {
      const token = localStorage.getItem("token");
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}housework/posting/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("POST 성공", response.data);
        const newHouseworkId = response.data.data.houseworkId;
        setHouseworkId(newHouseworkId); // 상태에 저장
        navigate(
          `/whotodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`
        );
      } else {
        console.error("에러 발생:");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader
        title={<br />}
        pageurl={`/maketodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`}
        houseworkId={houseworkId}
      />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>
              <p>정확히 어떤 집안일인가요?</p>
              <p style={{ fontSize: "16px" }}>꼭 입력하지 않아도 돼요.</p>
            </Comment>
          </Kkaebi>
          <Input
            placeholder="ex) 건조기"
            value={name}
            onChange={handleInputChange}
          />
        </Top>
        <Bottom>
          <NextBtn onClick={handleNextClick}>다음</NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default WhatTodoPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fafafa;
  height: calc(100vh - 132px); /* Header 패딩과 NextBtn 마진 포함 */
  overflow: hidden; /* 스크롤 숨기기 */
  padding-bottom: 74px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const Kkaebi = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  margin-bottom: 20px;
`;

const KkaebiProfile = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 16px;
`;

const Comment = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 20px;
  align-items: center;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box; /* 패딩 포함 너비 계산 */

  &::placeholder {
    color: #787878;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:focus {
    border: 0.5px solid #000; /* 포커스 시 검정색 테두리 */
    outline: none; /* 기본 포커스 효과 제거 */
  }
`;

const ErrorMessage = styled.div`
  color: #f00;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 12px;
  margin-left: 20px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const NextBtn = styled.button`
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 8px;
  background: #aa91e8;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
