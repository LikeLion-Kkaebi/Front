import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";
import CategorySelector from "../../components/CategorySelector";
import useHouseworkTagStore from "../../stores/HouseworkTagStore";

const SignupBestWorkPage = () => {
  const houseworkTag = useHouseworkTagStore((state) => state.houseworkTag); // Store에서 카테고리 가져오기
  const setSignupSelectedTag = useHouseworkTagStore(
    (state) => state.setSignupSelectedTag
  );
  const categories = Object.values(houseworkTag);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    const tag = Object.keys(houseworkTag).find(
      (key) => houseworkTag[key] === category
    );

    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSignupSelectedTag(null); // 선택 해제 시 Store의 값도 초기화
      console.log("선택취소");
    } else {
      setSelectedCategory(category);
      setSignupSelectedTag(Number(tag));
      console.log("선택된 tag:", tag);
    }
  };

  const handleNextClick = () => {
    if (selectedCategory) {
      navigate("/signupkkaebicomment");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <BackBtn
          src={SignupBackBtn}
          alt="뒤로가기"
          onClick={() => navigate("/signupcharacter")}
        />
      </Header>
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>
              거의 다 왔어요!
              <br />
              자신있는 집안일을 선택해주세요.
            </Comment>
          </Kkaebi>
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategory ? [selectedCategory] : []}
            onToggle={toggleCategory}
          />
        </Top>
        <Bottom>
          <NextBtn $isActive={!!selectedCategory} onClick={handleNextClick}>
            시작하기
          </NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default SignupBestWorkPage;

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
