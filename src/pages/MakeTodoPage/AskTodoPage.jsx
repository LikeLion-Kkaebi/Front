import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../../style/GlobalStyle";
import SignupBackBtn from "../../images/SignupBackBtn.svg";
import KkaebiProfileImg from "../../images/KkaebiProfile.svg";

import empty1Img from "../../images/character/빈피부미인.svg";
import empty2Img from "../../images/character/빈머리숱부자.svg";
import empty3Img from "../../images/character/빈핑크수집가.svg";
import empty4Img from "../../images/character/빈고민해결사.svg";
import empty5Img from "../../images/character/빈매듭의달인.svg";

import { useFamilyStore } from "../../stores/FamilyStore";
import BackHeader from "../../components/BackHeader";
import useHouseworkTagStore from "../../stores/HouseworkTagStore";
import instance from "axios";

// URL에서 쿼리스트링으로 전달된 데이터를 가져옴

const emptyImages = {
  1: empty1Img,
  2: empty2Img,
  3: empty3Img,
  4: empty4Img,
  5: empty5Img,
};

const AskTodoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const houseworkPlace = useHouseworkTagStore((state) => state.houseworkPlace);
  const houseworkDetail = useHouseworkTagStore(
    (state) => state.houseworkDetail
  );
  const houseworkTag = useHouseworkTagStore((state) => state.houseworkTag);
  const selectedTag = useHouseworkTagStore((state) => state.selectedTag);
  const setSelectedTag = useHouseworkTagStore((state) => state.setSelectedTag);
  const [tagValue, setTagValue] = useState("");
  const location = useLocation();
  const { selectedUser } = location.state || {};
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const { nickname, userid, characterImage } = selectedUser;
  const fetchProfiles = useFamilyStore((state) => state.fetchProfiles);
  const houseworkId = useHouseworkTagStore((state) => state.houseworkId);

  const queryYear = searchParams.get("year");
  const queryMonth = searchParams.get("month");
  const queryDay = searchParams.get("date");

  console.log("selectedUser 값:", selectedUser);
  console.log("characterImage 값:", characterImage);

  useEffect(() => {
    // tagNumber가 변경될 때마다 store에서 value 찾기
    if (selectedTag && houseworkTag[selectedTag]) {
      setTagValue(houseworkTag[selectedTag]); // 번호에 해당하는 value 저장
    } else {
      setTagValue("유효하지 않은 태그입니다."); // 유효하지 않은 번호 처리
    }
  }, [selectedTag, houseworkTag, houseworkId]);

  if (!selectedUser) {
    return (
      <div>
        데이터를 찾을 수 없습니다.
        <button onClick={() => navigate(-1)}>돌아가기</button>
      </div>
    );
  }

  const houseworkDate = `${queryYear}-${queryMonth}-${queryDay}`;
  console.log("날짜:", houseworkDate);
  // Zustand 상태 가져오기 (최적화)

  const handleConfirmClick = async () => {
    const putPayload = {
      housework_manager: userid, // selectedUser의 userid 추가
      houseworkId: houseworkId,
    };

    try {
      console.log("PUT 데이터:", putPayload);
      const token = localStorage.getItem("token");

      // 두 번째 요청
      const putResponse = await instance.put(
        `${process.env.REACT_APP_SERVER_PORT}housework/manager/`,
        putPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (putResponse.status === 200) {
        console.log("Manager PUT 성공", putResponse.data);

        navigate("/month"); // 성공하면 월별 페이지로 이동
      } else {
        console.error("PUT 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader
        title={<br />}
        pageurl={`/whotodo?year=${queryYear}&month=${queryMonth}&date=${queryDay}`}
      />
      <Container>
        <Top>
          <Kkaebi>
            <KkaebiProfile src={KkaebiProfileImg} alt="깨비 프로필 이미지" />
            <Comment>{`${nickname} 님에게 집안일을 부탁할게요.`}</Comment>
          </Kkaebi>
          <CarouselContainer>
            <Character>
              <TextInfo>{`${tagValue} / ${houseworkPlace} / ${houseworkDetail}`}</TextInfo>
              <CharacterImg
                src={emptyImages[characterImage]}
                alt="캐릭터 이미지"
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
  position: relative;
  display: flex;
  justify-content: center;
`;

const CharacterImg = styled.img.attrs({
  draggable: false,
})`
  width: 229px;
  height: 100%;
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

const TextInfo = styled.div`
  position: absolute;
  margin-top: 20px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.5px;
`;
