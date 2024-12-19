import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

const SignupCodeInputPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const inputsRef = useRef([]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // 한 칸 당 한 글자만 입력 가능
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 자동 포커스 이동
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // 버튼 활성화 조건 확인
    setIsButtonActive(newCode.every((char) => char !== ""));
    setError(""); // 에러 메시지 초기화
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join(""); // 입력된 코드 합치기
    if (!isButtonActive || loading) return;

    setLoading(true);
    setError(""); // 에러 초기화
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_PORT}user/house/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          },
          body: JSON.stringify({ housecode: fullCode }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API 성공:", data);
        localStorage.setItem("housecode", data.house.housecode);
        localStorage.setItem("housename", data.house.housename);
        navigate("/signupcharacter");
      } else {
        const errorData = await response.json();
        console.error("API 실패:", errorData);
        setError("코드를 찾을 수 없어요."); // 에러 메시지 설정
        setIsButtonActive(false); // 버튼 비활성화
        setCode(["", "", "", ""]); // 입력값 초기화
        inputsRef.current[0]?.focus(); // 첫 번째 입력창으로 포커스 이동
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setError("코드를 찾을 수 없어요."); // 에러 메시지 설정
      setIsButtonActive(false); // 버튼 비활성화
      setCode(["", "", "", ""]); // 입력값 초기화
      inputsRef.current[0]?.focus(); // 첫 번째 입력창으로 포커스 이동
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <BackBtn
          src={SignupBackBtn}
          alt="뒤로가기"
          onClick={() => navigate("/signupname")}
        />
      </Header>
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>우리집 코드를 입력해주세요.</Comment>
          </Kkaebi>
          <CodeInput>
            {code.map((char, index) => (
              <Input
                key={index}
                value={char}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </CodeInput>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Top>
        <Bottom>
          <Question onClick={() => navigate("/signupsethome")}>
            우리집 코드가 없나요?
          </Question>
          <NextBtn
            $isActive={isButtonActive && !loading}
            onClick={handleSubmit}
          >
            {loading ? "처리 중..." : "다음"}
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default SignupCodeInputPage;

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
  line-height: 150%;
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
  line-height: 150%;
`;

const CodeInput = styled.div`
  display: flex;
  position: relative;
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
  text-align: center;

  &:focus {
    border: 0.5px solid #000; /* 포커스 시 검정색 테두리 */
    outline: none; /* 기본 포커스 효과 제거 */
  }
`;
const ErrorMessage = styled.div`
  position: absolute;
  color: #f00;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-top: 162px;
  width: 100%;
  left: 0;
  text-align: center;
  margin-left: -110px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Question = styled.button`
  color: var(--key_purple, #aa91e8);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  margin-bottom: 20px;
  cursor: pointer;
  height: 24px;
  width: 153px;
  border: none;
  background-color: transparent;
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
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#967bd9" : "#bebebe")};
  }
`;
