import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import profile from "../images/RedCircle.svg";

const FamilyTodo = ({ task }) => {
  const { nickname } = task.user;
  const { tagid, houseworkPlace, houseworkDetail } = task.tag;
  const isDone = task.houseworkDone;

  return (
    <Container>
      <GlobalStyle />
      <Img src={profile} alt="프로필사진" />
      <Wrapper>
        <NameWrapper>
          <Name>{nickname}</Name>
          <FinishBtn isDone={isDone}>{isDone ? "완료" : "미완료"}</FinishBtn>
        </NameWrapper>
        <CategoryWrapper>
          <Category>{tagid}</Category>
          <Category>{houseworkPlace}</Category>
          <Category>{houseworkDetail}</Category>
        </CategoryWrapper>
      </Wrapper>
    </Container>
  );
};

export default FamilyTodo;

const GlobalStyle = createGlobalStyle`

`;

const Container = styled.div`
  display: flex;
  padding: 20px 24px;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  margin-top: 12px;
  border-radius: 11px;
  background: #fff;
  flex-direction: row;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background: ${({ isDone }) =>
    isDone ? "var(--key_purple, #aa91e8)" : "#bebebe"};
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
