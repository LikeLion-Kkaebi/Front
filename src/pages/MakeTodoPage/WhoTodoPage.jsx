import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import FamilySelector from "../../components/FamilySelector";
import { useFamilyStore } from "../../stores/FamilyStore";
import BackHeader from "../../components/BackHeader";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

const WhoTodoPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const profiles = useFamilyStore((state) => state.profiles);
  const fetchProfiles = useFamilyStore((state) => state.fetchProfiles);
  // URL에서 쿼리스트링으로 전달된 데이터를 가져옴
  const queryYear = searchParams.get("year");
  const queryMonth = searchParams.get("month");
  const queryDay = searchParams.get("date");

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const toggleCategory = (nickname) => {
    if (selectedCategories.includes(nickname)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== nickname));
    } else {
      setSelectedCategories((prev) => [...prev, nickname]);
    }
  };

  const handleNextClick = () => {
    if (selectedCategories.length > 0) {
      const selectedUser = profiles.find(
        (profile) => profile.nickname === selectedCategories[0]
      );
      navigate(
        `/Asktodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`,
        {
          state: {
            selectedUser,
            characterImage: selectedUser.characterImage,
          },
        }
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader
        title={<br />}
        pageurl={`/whattodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`}
      />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>담당할 식구를 선택해주세요.</Comment>
          </Kkaebi>
          <FamilySelector
            selectedCategories={selectedCategories}
            onToggle={toggleCategory}
          />
        </Top>
        <Bottom>
          <NextBtn
            $isActive={selectedCategories.length > 0}
            onClick={handleNextClick}
          >
            다음
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default WhoTodoPage;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fafafa;
  height: calc(100vh - 132px);
  overflow: hidden;
  padding-bottom: 74px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const Kkaebi = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
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
  margin-bottom: 20px;
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
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#967bd9" : "#bebebe")};
  }
`;
