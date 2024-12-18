import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import SignupBackBtn from "../images/SignupBackBtn.svg";
import BackHeader from "../components/BackHeader";

const NotificationPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <BackHeader title="알림" pageurl={"/homemain"} />
      <Container></Container>
    </>
  );
};

export default NotificationPage;

const Header = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  align-self: stretch;
  background-color: #fafafa;
`;

const BackBtn = styled.button`
  width: 9px;
  height: 18px;
  border: none;
  background: url(${SignupBackBtn}) no-repeat center;
  background-size: contain;
  cursor: pointer;
`;

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
