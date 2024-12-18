import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "../../style/GlobalStyle";
import SignupIntroComment from "../../images/SignupKkaebiComment.svg";
import SignupIntroKkaebi from "../../images/SignupIntroKkaebi.svg";

const SignupKkaebiCommentPage = () => {
  const navigate = useNavigate();

  // 3초 후 페이지 전환
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/homemain");
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Comment src={SignupIntroComment} alt="깨비 말풍선" />
        <Character src={SignupIntroKkaebi} alt="깨비 캐릭터" />
      </Container>
    </>
  );
};

export default SignupKkaebiCommentPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh; /* 화면 전체 높이로 설정 */
  background: #fafafa;
  position: relative;
  overflow: hidden;
`;

const Character = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  max-height: 100vh;
  object-fit: contain;

  /* 화면 세로 길이가 충분히 크면 하단 공백 방지 */
  @media (min-height: 800px) {
    bottom: 0px; /* 화면이 길어질 때 하단 공백 최소화 */
  }
`;

const Comment = styled.img`
  margin: 0;
  padding: 0;
  z-index: 1;
  margin-top: 233px;
  position: relative;
`;
