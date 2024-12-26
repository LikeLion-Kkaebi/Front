import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import BackHeader from "../components/BackHeader";
import useDateStore from "../stores/DateStore"; // DateStore 가져오기
import KkaebiProfileImg from "../images/KkaebiProfile.svg";

import Copy from "../images/Copy.svg";

const UpgradePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("myTasks");
  const [adjustedMargin, setAdjustedMargin] = useState(85);

  // Zustand에서 상태와 상태 변경 함수 가져오기
  const { setYear, setMonth, setDay, month, day } = useDateStore();

  // URL에서 쿼리스트링으로 전달된 데이터를 가져옴
  const queryYear = searchParams.get("year");
  const queryMonth = searchParams.get("month");
  const queryDay = searchParams.get("date");

  useEffect(() => {
    const totalHeight = document.body.scrollHeight; // 콘텐츠의 총 높이
    const windowHeight = window.innerHeight; // 기기의 화면 높이
    if (totalHeight > windowHeight) {
      const marginAdjustment = totalHeight - windowHeight;
      setAdjustedMargin(85 - marginAdjustment); // 화면이 짧으면 margin을 조정
    }
  }, []);

  // 상태 업데이트
  useEffect(() => {
    if (queryYear && queryMonth && queryDay) {
      setYear(Number(queryYear));
      setMonth(Number(queryMonth));
      setDay(Number(queryDay)); // queryDay를 setDay에 제대로 전달
    }
  }, [queryYear, queryMonth, queryDay, setYear, setMonth, setDay]);

  return (
    <>
      <GlobalStyle />
      <BackHeader title={`플랜 업그레이드`} pageurl={"/mypage"} />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>
              <p>
                플랜을 업그레이드 하면 <br />
                그동안의 집안일 데이터를 바탕으로
              </p>
              <Box>
                <Number>1</Number>
                <p>오늘 해야하는 집안일</p>
              </Box>
              <Box>
                <Number>2</Number>
                <p>오늘 집안일을 할 식구</p>
              </Box>
              <p>를 추천해드릴게요!</p>
            </Comment>
          </Kkaebi>
        </Top>
        <Bottom>
          <NextBtn>플랜 업그레이드 하기</NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default UpgradePage;

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
  cursor: "pointer";
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid var(--key_purple, #aa91e8);
  background: #fff;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Number = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid var(--key_purple, #aa91e8);
  background: rgba(170, 145, 232, 0.4);
  color: var(--key_purple, #aa91e8);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  align-self: stretch;
`;
