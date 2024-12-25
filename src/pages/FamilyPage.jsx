import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import BackHeader from "../components/BackHeader";
import useDateStore from "../stores/DateStore"; // DateStore 가져오기
import MyTodo from "../components/MyTodo";
import FamilyTodo from "../components/FamilyTodo";
import add from "../images/add.svg";
import Copy from "../images/Copy.svg";
import FamilyList from "../components/FamilyList";
import instance from "axios";
import Delete from "../images/Delete.svg";

import userCharacter1Img from "../images/character/프사피부미인.svg";
import userCharacter2Img from "../images/character/프사머리숱부자.svg";
import userCharacter3Img from "../images/character/프사핑크수집가.svg";
import userCharacter4Img from "../images/character/프사고민해결사.svg";
import userCharacter5Img from "../images/character/프사매듭의달인.svg";

const characterImages = {
  1: userCharacter1Img,
  2: userCharacter2Img,
  3: userCharacter3Img,
  4: userCharacter4Img,
  5: userCharacter5Img,
};

const FamilyPage = () => {
  const navigate = useNavigate();
  const housecode = localStorage.getItem("housecode");
  const [familyData, setFamilyData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}mypage/member/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();

          setFamilyData(data.housemembers);
          console.log(familyData);
        } else {
          console.error("Failed to fetch family data", response.status);
        }
      } catch (error) {
        console.error("Error fetching family data:", error);
      }
    };

    fetchFamilyData();
  }, []);

  if (!familyData) {
    return <div>로딩중</div>; // 데이터 로드 전 로딩 상태
  }

  const { family } = familyData;

  return (
    <>
      <GlobalStyle />
      <BackHeader title={`우리집 관리하기`} pageurl={"/mypage"} />
      <Container>
        <Top>
          <Text>우리집 코드</Text>
          <Code>
            <p>{housecode}</p>
            <img src={Copy} />
          </Code>
        </Top>
        <Top>
          <Text>식구들</Text>
          {family.length > 0 ? (
            family.map((member, index) => (
              <Container2 key={index}>
                <Wrapper2>
                  <Img
                    src={characterImages[member.character]}
                    alt="Family Character"
                  />
                  <NameWrapper>
                    <Name>{member.nickname}</Name>
                  </NameWrapper>
                </Wrapper2>
                <DeleteImg src={Delete} alt="삭제 버튼" />
              </Container2>
            ))
          ) : (
            <NoFamilyMessage>
              아직 식구가 없어요.
              <br />
              식구를 추가해 주세요.
            </NoFamilyMessage>
          )}
        </Top>
        <Bottom></Bottom>
      </Container>
    </>
  );
};

export default FamilyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: calc(100vh); /* Header 패딩과 NextBtn 마진 포함 */
  overflow: hidden; /* 스크롤 숨기기 */
  padding-bottom: 74px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  margin-bottom: 24px;
`;

const Text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: -0.5px;
`;

const Code = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  gap: 257px;
  align-self: stretch;
  border-radius: 8px;
  border: 0.5px solid #cecece;
  background: #fff;
  color: #787878;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  margin-bottom: 9px;
`;

const Tab = styled.div`
  position: relative;
  color: ${(props) => (props.isActive ? "#000" : "#787878")};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  line-height: normal;
  letter-spacing: -0.5px;
  cursor: pointer;
  text-align: center;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -5px; /* 텍스트 아래 위치 */
  left: 0;
  width: 100%; /* 부모 요소(Tab)의 너비와 동일 */
  height: 0px;
  border-bottom: 1.7px solid #000;
`;

const Floating = styled.img`
  display: flex;
  width: 18.824px;
  height: 16.314px;
  padding: 23.843px 22.588px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12.549px;
  flex-shrink: 0;
  border-radius: 53.961px;
  background: var(--purple, #aa91e8);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: fixed; /* 화면에 고정 */
  bottom: 50px; /* 화면 bottom에서 40px 위 */
  right: 20px; /* 우측 20px로 위치 */
`;
const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NoFamilyMessage = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
`;

const Container2 = styled.div`
  display: flex;
  padding: 20px 24px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  margin-top: 12px;
  border-radius: 11px;
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 46px;
  height: 46px;
`;

const DeleteImg = styled.img`
  width: 24px;
  height: 24px;
`;

const Wrapper2 = styled.div`
  display: flex;
  gap: 21px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
