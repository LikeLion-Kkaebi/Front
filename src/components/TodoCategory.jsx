import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import instance from "../api/axios";

const TodoCategory = ({ name }) => {
  return (
    <>
      <GlobalStyle />
      <Container>{name}</Container>
    </>
  );
};

export default TodoCategory;

const GlobalStyle = createGlobalStyle`

`;

const Container = styled.div`
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
