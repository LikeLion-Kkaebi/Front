import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

const SignupGenerateCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [houseName, setHouseName] = useState(""); // housename 상태 추가
  const inputsRef = useRef([]);

  useEffect(() => {
    // Mock 데이터 가져오기
    const fetchMockData = async () => {
      try {
        const response = await fetch("/mockdata.json");
        const data = await response.json();
        const housecodeArray = data.data.housecode.split(""); // 한 글자씩 배열로 변환
        setCode(housecodeArray); // 상태에 저장
        setHouseName(data.data.housename); // housename 설정
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };

    fetchMockData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header>
        <BackBtn
          src={SignupBackBtn}
          alt="뒤로가기"
          onClick={() => navigate("/signupsethome")}
        />
      </Header>
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>
              <HouseName>
                <Comment1>{houseName}</Comment1> {/* housename 동적 표시 */}
                <Comment2>의</Comment2>
              </HouseName>
              <Comment3>우리집 코드를 생성했어요!</Comment3>
            </Comment>
          </Kkaebi>
          <CodeInput>
            {code.map((char, index) => (
              <Input
                key={index}
                value={char}
                readOnly // 읽기 전용으로 설정
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </CodeInput>
        </Top>
        <Bottom>
          <NextBtn onClick={() => navigate("/signupcodeinput")}>다음</NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default SignupGenerateCodePage;

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
  display: flex;
  flex-direction: column;
`;

const HouseName = styled.div`
  display: flex;
  flex-direction: row;
`;

const Comment1 = styled.div`
  color: var(--key_purple, #aa91e8);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

const Comment2 = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Comment3 = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;

const CodeInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Input = styled.input`
  display: flex;
  width: 79.25px;
  height: 80px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 1; /* 수직 중앙 정렬 */
  text-align: center; /* 수평 중앙 정렬 */

  &:focus {
    border: 0.5px solid #000; /* 포커스 시 검정색 테두리 */
    outline: none; /* 기본 포커스 효과 제거 */
  }
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const NextBtn = styled.button`
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 8px;
  background: var(--key_purple, #aa91e8);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: #967bd9;
  }
`;
