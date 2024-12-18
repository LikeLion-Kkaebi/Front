import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useLevelStore from "../stores/LevelStore"; // zustand store
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import Header from "../components/Header";

import instance from "axios";
import useImageStore from "../stores/ImageStore";

import Modal from "../components/Modal";

import Exit from "../images/Exit.svg";
import Premium from "../images/Premium.svg";
import Ranking from "../images/Ranking.svg";
import People from "../images/People.svg";
import RightArrow from "../images/RightArrow.svg";
import Ask from "../images/Ask.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const {
    completionRate,
    setCompletionRate,
    activeLevel,
    setActiveLevel,
    characterImg,
    setCharacterImg,
  } = useLevelStore();

  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가

  const characterImages = useImageStore((state) => state.characterImages); // 스토어에서 캐릭터 이미지 가져오기
  const [imageNumber, setImageNumber] = useState(null); // API에서 받은 이미지 번호
  const [selectedImage, setSelectedImage] = useState(""); // 선택된 이미지 경로

  const fetchImageNumber = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // 토큰 가져오기
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}mypage/user/`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("API 요청 성공:", response.data);
        setImageNumber(response.data.characterNumber); // 서버에서 받은 번호 저장
        const nickname = response.data.nickname;
      } else {
        console.error("API 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchImageNumber(); // 컴포넌트 마운트 시 API 요청 실행
  }, []);

  useEffect(() => {
    // 이미지 번호가 변경되면 스토어에서 이미지 경로 선택
    if (imageNumber && characterImages[imageNumber]) {
      setSelectedImage(characterImages[imageNumber]);
    } else {
      setSelectedImage(""); // 유효하지 않은 번호 처리
    }
  }, [imageNumber, characterImages]);

  useEffect(() => {
    // Mock data fetch
    fetch("/homeMockdata.json")
      .then((res) => res.json())
      .then((data) => {
        // tasks.today_completion_rate로 completionRate 값 설정
        const { today_completion_rate } = data.tasks;
        setCompletionRate(today_completion_rate);

        // completionRate에 따라 activeLevel과 characterImg 설정
        const level = getLevel(today_completion_rate);
        setActiveLevel(level);
        setCharacterImg(characterImages[level]);
      });
  }, [setCompletionRate, setActiveLevel, setCharacterImg]);

  // completionRate에 따라 활성화된 레벨 계산
  const getLevel = (rate) => {
    if (rate === 100) return 7;
    if (rate >= 99) return 6;
    if (rate >= 80) return 5;
    if (rate >= 60) return 4;
    if (rate >= 40) return 3;
    if (rate >= 20) return 2;
    return 1; // Lv1은 0%
  };

  const [modal, setModal] = useState(false);
  // 모달창의 state를 바꾸는 함수 작성 (true <-> false)
  const openModal = () => {
    setModal(true);
  };

  const goExit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}mypage/remove-account/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("계정 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <GlobalStyle />
      {modal ? <Modal setModal={setModal} goExit={goExit} /> : null}
      <Header title="마이페이지" />
      <Container>
        <Top>
          <ProfileContainer>
            <ProfileInfo>
              <LevelName>{`${nickname}`}</LevelName>
              <LevelBadge>Lv.3. 티끌수집가</LevelBadge>
              <CharacterIcon
                src={selectedImage}
                alt={`선택된 캐릭터 ${imageNumber}`}
              />
            </ProfileInfo>
          </ProfileContainer>

          {/* 레벨 진행도 바 */}
          <LevelContainer>
            <TopContainer>
              <img src={Ranking} alt="Ranking" />
              <Label>이번 주 나의 레벨</Label>

              <img src={Ask} alt="?" />
            </TopContainer>

            <ProgressBar>
              {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                <ProgressItem key={level} active={level <= activeLevel}>
                  {level === activeLevel && (
                    <ProfileImage
                      src={characterImg}
                      alt="User Character"
                      active={true}
                    />
                  )}
                </ProgressItem>
              ))}
            </ProgressBar>
          </LevelContainer>
        </Top>

        {/* 하단 버튼 영역 */}
        <Bottom>
          <ButtonContainer>
            <ActionButton onClick={() => navigate("/family")}>
              <BtnContainer>
                <img src={People} alt="Ranking" />
                <Label>우리집 관리하기</Label>
              </BtnContainer>
              <img src={RightArrow} alt="Next Month" />
            </ActionButton>
            <UpgradeButton onClick={() => navigate("/upgrade")}>
              <img src={Premium} alt="Ranking" />
              <Label>플랜 업그레이드</Label>
            </UpgradeButton>
            <ExitButton onClick={openModal}>
              <img src={Exit} alt="Ranking" />
              <Label>탈퇴하기</Label>
            </ExitButton>
          </ButtonContainer>
        </Bottom>
      </Container>
    </>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: #fafafa;
  height: calc(100vh - 132px);
  overflow-y: auto;
  padding-bottom: 74px;
`;

const Top = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: -0.268px;
  align-self: stretch;
  border-radius: 21px;
  background: var(--key_purple, #aa91e8);
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 10px; /* ProgressItem 위에 표시 */
  left: 50%;
  transform: translateX(-50%);
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  width: 27px;
  height: 27px;
`;

const CharacterIcon = styled.img``;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const LevelName = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const LevelBadge = styled.div`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #fff;
  color: #aa91e8;
  font-family: Pretendard;
  font-size: 12px;
`;

const LevelContainer = styled.div`
  display: flex;
  align-self: stretch;
  padding: 14px 20px;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  border-radius: 21px;
  background: #fff;
`;

const Label = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3px;
`;

const ProgressItem = styled.div`
  height: 45px;
  width: 100%;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.active ? "#AA91E8" : "#f5f5f6")};
  position: relative;
`;

const Bottom = styled.div`
  margin-top: 16px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
`;
const ActionButton = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch; /* 부모 컨테이너의 너비를 상속 */
  border-radius: 11px;
  background: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;
const UpgradeButton = styled.div`
  padding: 20px 22px;
  gap: 8px;
  align-self: stretch;

  border-radius: 11px;
  background: var(--key_purple, #aa91e8);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;

  Label {
    color: white;
  }

  &:hover {
    background-color: #967bd9;
  }
`;
const ExitButton = styled.div`
  display: flex;
  padding: 20px 22px;
  align-self: stretch;
  align-items: center;
  align-self: stretch;
  border-radius: 11px;
  background: #fff;
  cursor: pointer;
  gap: 8px;

  &:hover {
    background-color: #eaeaea;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
