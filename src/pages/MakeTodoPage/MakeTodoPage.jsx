import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";
import CategorySelector from "../../components/CategorySelector"; // 새 컴포넌트 경로
import BackHeader from "../../components/BackHeader";
import useHouseworkTagStore from "../../stores/HouseworkTagStore"; // Store 경로

const MakeTodoPage = () => {
  const houseworkTag = useHouseworkTagStore((state) => state.houseworkTag);
  const [searchParams] = useSearchParams();

  const setSelectedTag = useHouseworkTagStore((state) => state.setSelectedTag);
  const categories = Object.values(houseworkTag);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  // URL에서 쿼리스트링으로 전달된 데이터를 가져옴
  const queryYear = searchParams.get("year");
  const queryMonth = searchParams.get("month");
  const queryDay = searchParams.get("date");

  const toggleCategory = (category) => {
    const tag = Object.keys(houseworkTag).find(
      (key) => houseworkTag[key] === category
    );

    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedTag(null); // 선택 해제 시 Store의 값도 초기화
    } else {
      setSelectedCategory(category);
      setSelectedTag(Number(tag)); // 선택한 Tag의 번호를 Store에 저장
      console.log("선택된 tag:", tag);
    }
  };

  const handleNextClick = () => {
    if (selectedCategory) {
      navigate(
        `/wheretodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader title={<br />} pageurl={"/month"} />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>집안일 카테고리를 선택해주세요.</Comment>
          </Kkaebi>
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategory ? [selectedCategory] : []} // 단일 선택에 맞게 수정
            onToggle={toggleCategory}
          />
        </Top>
        <Bottom>
          <NextBtn $isActive={!!selectedCategory} onClick={handleNextClick}>
            다음
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default MakeTodoPage;

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
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#967bd9" : "#bebebe")};
  }
`;
