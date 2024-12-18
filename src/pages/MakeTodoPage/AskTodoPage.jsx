import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";
import RedCImg from "../../images/character/피부미인.png";
import YellowCImg from "../../images/character/머리숱부자.png";
import BlackCImg from "../../images/character/핑크수집가.png";
import GreenCImg from "../../images/character/고민해결사.png";
import BlueCImg from "../../images/character/매듭의달인.png";

import { useFamilyStore } from "../../stores/FamilyStore";
import BackHeader from "../../components/BackHeader";
import useHouseworkTagStore from "../../stores/HouseworkTagStore";
import instance from "axios";

const characters = [
  { id: 1, src: RedCImg, label: "피부 미인" },
  { id: 2, src: YellowCImg, label: "머리숱 부자" },
  { id: 3, src: BlackCImg, label: "핑크 수집가" },
  { id: 4, src: GreenCImg, label: "고민 해결사" },
  { id: 5, src: BlueCImg, label: "매듭의 달인" },
];

const AskTodoPage = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const fetchProfiles = useFamilyStore((state) => state.fetchProfiles);
  const nickname = useFamilyStore((state) => state.nickname);

  // Zustand 상태 가져오기 (최적화)
  const houseworkPlace = useHouseworkTagStore((state) => state.houseworkPlace);
  const houseworkDetail = useHouseworkTagStore(
    (state) => state.houseworkDetail
  );
  const selectedTag = useHouseworkTagStore((state) => state.selectedTag);
  const setSelectedTag = useHouseworkTagStore((state) => state.setSelectedTag);

  const handleConfirmClick = async () => {
    const payload = {
      houseworkPlace: houseworkPlace || "미정",
      houseworkDetail: houseworkDetail || "미정",
      tag: selectedTag,
    };

    console.log("POST 데이터:", payload);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}housework/posting/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("POST 성공");
        navigate("/month");
      } else {
        console.error("POST 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader title={<br />} pageurl={"/whotodo"} />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>{`${nickname} 님에게 집안일을 부탁할게요.`}</Comment>
          </Kkaebi>
          <CarouselContainer>
            <Character>
              <CharacterImg
                src={characters[selectedCharacter].src}
                alt={characters[selectedCharacter].label}
              />
            </Character>
          </CarouselContainer>
        </Top>
        <Bottom>
          <NextBtn onClick={handleConfirmClick}>확인</NextBtn>
        </Bottom>
      </Container>
    </>
  );
};

export default AskTodoPage;

// Styled Components
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
  font-weight: 400;
  line-height: 150%;
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
  font-weight: 400;
  line-height: 150%;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 114.5px;
  width: 100%;
  height: 300px;
`;

const Character = styled.div`
  text-align: center;
`;

const CharacterImg = styled.img.attrs({
  draggable: false,
})`
  width: 201px;
  height: 310px;
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
  background: #aa91e8;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #967bd9;
  }
`;
