import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

const SignupNamePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 8) {
      setError("이름은 최대 8글자로 작성해주세요.");
      setIsButtonActive(false);
    } else if (inputValue.length === 0) {
      setError("");
      setIsButtonActive(false);
    } else {
      setError("");
      setIsButtonActive(true);
    }
    setName(inputValue);
  };

  const handleInputBlur = () => {
    if (name.length > 8 || name.length === 0) {
      setIsButtonActive(false);
    }
  };

  const handleNextClick = async () => {
    if (!isButtonActive) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("로그인이 필요합니다. 다시 로그인해주세요.");
        return;
      }

      const response = await instance.put(
        `${process.env.REACT_APP_SERVER_PORT}user/create/nickname/`,
        { nickname: name }, // 요청 바디
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 추가
          },
        }
      );

      if (response.status === 200) {
        console.log("이름 업데이트 성공:", response.data);
        navigate("/signupcodeinput");
      }
    } catch (err) {
      console.error("이름 업데이트 실패:", err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
          "서버 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <BackBtn
          src={SignupBackBtn}
          alt="뒤로가기"
          onClick={() => navigate("/signupintro")}
        />
      </Header>
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>이름을 알려주세요.</Comment>
          </Kkaebi>
          <Input
            placeholder="ex) 깨비"
            value={name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Top>
        <Bottom>
          <NextBtn
            $isActive={isButtonActive}
            onClick={handleNextClick} // 백엔드 연결
          >
            다음
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default SignupNamePage;

// 기존 스타일 코드 그대로 사용

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

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 46px;
  padding: 20px;
  align-items: center;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-sizing: border-box; /* 패딩 포함 너비 계산 */

  &::placeholder {
    color: #787878;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:focus {
    border: 0.5px solid #000; /* 포커스 시 검정색 테두리 */
    outline: none; /* 기본 포커스 효과 제거 */
  }
`;

const ErrorMessage = styled.div`
  color: #f00;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 12px;
  margin-left: 20px;
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
