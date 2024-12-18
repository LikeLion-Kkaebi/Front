import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import BackHeader from "../components/BackHeader";
import useDateStore from "../stores/DateStore"; // DateStore 가져오기
import MyTodo from "../components/MyTodo";
import FamilyTodo from "../components/FamilyTodo";
import add from "../images/add.svg";
import Copy from "../images/Copy.svg";
import FamilyList from "../components/FamilyList";

const FamilyPage = () => {
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
      <BackHeader title={`우리집 관리하기`} pageurl={"/mypage"} />
      <Container>
        <Top>
          <Text>우리집 코드</Text>
          <Code>
            <p>123a</p>
            <img src={Copy} />
          </Code>
        </Top>
        <Top>
          <Text>식구들</Text>
          <FamilyList />
        </Top>
        <Bottom></Bottom>
      </Container>
    </>
  );
};

export default FamilyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: calc(100vh); /* Header 패딩과 NextBtn 마진 포함 */
  overflow: hidden; /* 스크롤 숨기기 */
  padding-bottom: 74px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  margin-bottom: 24px;
`;

const Text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: -0.5px;
`;

const Code = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  gap: 257px;
  align-self: stretch;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #787878;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  margin-bottom: 9px;
`;

const Tab = styled.div`
  position: relative;
  color: ${(props) => (props.isActive ? "#000" : "#787878")};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  line-height: normal;
  letter-spacing: -0.5px;
  cursor: pointer;
  text-align: center;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -5px; /* 텍스트 아래 위치 */
  left: 0;
  width: 100%; /* 부모 요소(Tab)의 너비와 동일 */
  height: 0px;
  border-bottom: 1.7px solid #000;
`;

const Floating = styled.img`
  display: flex;
  width: 18.824px;
  height: 16.314px;
  padding: 23.843px 22.588px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12.549px;
  flex-shrink: 0;
  border-radius: 53.961px;
  background: var(--purple, #aa91e8);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: fixed; /* 화면에 고정 */
  bottom: 50px; /* 화면 bottom에서 40px 위 */
  right: 20px; /* 우측 20px로 위치 */
`;
const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;
