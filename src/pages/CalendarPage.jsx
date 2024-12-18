import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "axios";

import GlobalStyle from "../style/GlobalStyle";
import Header from "../components/Header";

import LeftArrow from "../images/LeftArrow.svg";
import RightArrow from "../images/RightArrow.svg";
import MyTodo from "../components/MyTodo";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const today = new Date();

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    setCurrentDate(newDate);
  };

  const handleDateClick = async (selectedDay) => {
    if (selectedDay) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      // 날짜를 쿼리스트링으로 navigate
      navigate(`/day?year=${year}&month=${month}&date=${selectedDay}`);
    }
  };

  const renderDays = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <DaysContainer>
        {daysOfWeek.map((day, index) => (
          <Day key={index}>{day}</Day>
        ))}
      </DaysContainer>
    );
  };

  const renderDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const dates = [];

    // 이전 월의 마지막 날짜 계산
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      dates.push({ date: prevMonthLastDate - i, type: "prev" });
    }

    // 현재 월의 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      dates.push({ date: i, type: "current" });
    }

    // 다음 달의 날짜 추가
    const remainingDays = (7 - (dates.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({ date: i, type: "next" });
    }

    const rows = [];
    for (let i = 0; i < dates.length; i += 7) {
      rows.push(dates.slice(i, i + 7));
    }

    return (
      <DatesContainer>
        {rows.map((week, rowIndex) => (
          <Week key={rowIndex}>
            {week.map((dateObj, colIndex) => (
              <DateBox
                key={colIndex}
                type={dateObj.type}
                onClick={() =>
                  dateObj.type === "current" && handleDateClick(dateObj.date)
                }
              >
                {dateObj.date}
              </DateBox>
            ))}
          </Week>
        ))}
      </DatesContainer>
    );
  };

  return (
    <>
      <GlobalStyle />
      <Header title="캘린더" />
      <Container>
        <HeaderContainer>
          <ArrowButton onClick={handlePrevMonth}>
            <img src={LeftArrow} alt="Previous Month" />
          </ArrowButton>
          <MonthLabel>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </MonthLabel>
          <ArrowButton onClick={handleNextMonth}>
            <img src={RightArrow} alt="Next Month" />
          </ArrowButton>
        </HeaderContainer>
        {renderDays()}
        {renderDates()}
        <MyTodoContainer>
          <Name>{`${today.getMonth() + 1}월 ${today.getDate()}일`}</Name>
          <MyTodo categoryName="카테고리 이름" removeStyles />
          <MyTodo categoryName="카테고리 이름" removeStyles />
        </MyTodoContainer>
      </Container>
    </>
  );
};

export default CalendarPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: #fafafa;
  height: calc(100vh - 132px);
  overflow-y: auto;
  padding-bottom: 74px;
`;

const MyTodoContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  align-self: stretch;
  background: #fff;
  margin-top: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const MonthLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;

const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Day = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #555;
`;

const DatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Week = styled.div`
  display: flex;
  justify-content: ${({ isLastWeek }) =>
    isLastWeek ? "flex-start" : "space-between"};
`;

const DateBox = styled.div`
  flex: 1;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ type }) =>
    type === "prev" || type === "next"
      ? "#ccc"
      : "inherit"}; // 이전/다음 달 날짜는 회색
  &:hover {
    background: ${({ type }) =>
      type === "current" ? "var(--key_purple, #aa91e8)" : "none"};
    border-radius: ${({ type }) => (type === "current" ? "100%" : "none")};
    color: ${({ type }) => (type === "current" ? "white" : "inherit")};
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #e1e1e1;
  margin: 10px 0;
`;

const Name = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.5px;
`;
