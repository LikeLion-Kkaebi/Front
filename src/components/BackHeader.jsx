import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

import LeftArrow from "../images/LeftArrow.svg";

const Header = ({ title, pageurl }) => {
  const navigate = useNavigate();

  const goToPage = (url) => {
    navigate(url);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <BackBtn
          src={LeftArrow}
          alt="Back Btn"
          onClick={() => goToPage(pageurl)}
        />
        <Name>{title}</Name>
      </Container>
    </>
  );
};

export default Header;

const GlobalStyle = createGlobalStyle`

`;

const Container = styled.div`
  background-color: #fafafa;
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 12px;
  img {
    cursor: pointer;
  }
`;

const BackBtn = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Name = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.5px;
`;
