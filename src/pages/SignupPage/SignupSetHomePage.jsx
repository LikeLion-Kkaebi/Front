import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

const SignupSetHomePage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <BackBtn
          src={SignupBackBtn}
          alt="뒤로가기"
          onClick={() => navigate("/signupcodeinput")}
        />
      </Header>
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>우리 집 이름을 알려주세요.</Comment>
          </Kkaebi>
          <InputBox>
            <Input
              placeholder="ex) 깨비"
              value={inputValue}
              onChange={handleInputChange}
            />
            <House>하우스</House>
          </InputBox>
        </Top>
        <Bottom>
          <NextBtn
            $isActive={inputValue.trim() !== ""}
            onClick={() => {
              if (inputValue.trim() !== "") {
                navigate("/signupgeneratecode");
              }
            }}
          >
            다음
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default SignupSetHomePage;

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

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const Kkaebi = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  box-sizing: border-box;

  @media (max-width: 320px) {
    /* 가로 길이가 400px 이하일 때 */
    width: calc(95% - 40px); /* padding 20px을 양쪽에서 제외한 너비 */
  }

  @media (max-width: 300px) {
    /* 더 작은 화면에서도 추가 조정 */
    width: calc(95% - 60px); /* 추가적인 여백 확보 */
  }
`;

const Input = styled.input`
  flex: 1;
  height: 46px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box;

  &::placeholder {
    color: #787878;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:focus {
    border: 0.5px solid #000;
    outline: none;
  }
`;

const House = styled.div`
  margin-left: 16px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
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
  background: ${(props) =>
    props.$isActive ? "var(--key_purple, #AA91E8)" : "#bebebe"};
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$isActive ? "pointer" : "not-allowed")};
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#967bd9" : "#bebebe")};
  }
`;
