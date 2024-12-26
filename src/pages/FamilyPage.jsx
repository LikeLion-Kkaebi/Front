import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "axios";
import GlobalStyle from "../style/GlobalStyle";
import BackHeader from "../components/BackHeader";
import { useFamilyStore } from "../stores/FamilyStore";
import Copy from "../images/Copy.svg";
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
  const familyProfiles = useFamilyStore((state) => state.profiles);
  const fetchProfiles = useFamilyStore((state) => state.fetchProfiles);
  const currentUserId = localStorage.getItem("user_id"); // 현재 사용자의 userid

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleDelete = async (userid) => {
    // 본인 삭제 방지
    if (userid === currentUserId) {
      alert("본인은 삭제할 수 없습니다!");
      return;
    }

    try {
      const response = await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}mypage/remove-member/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization 토큰을 헤더에 추가
          },
          data: {
            userid, // 삭제하려는 식구의 userid
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message); // 성공 시 메세지 표시
        fetchProfiles(); // 삭제 후 프로필 갱신
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.userid[0];
        if (errorMessage.includes("이 필드는 필수 항목입니다")) {
          alert("본인은 삭제할 수 없습니다!");
        } else {
          alert("삭제 요청에 실패했습니다.");
        }
      } else {
        console.error("Failed to delete member:", error);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(housecode).then(() => {
      alert("우리집 코드가 클립보드에 복사되었습니다!");
    });
  };

  return (
    <>
      <GlobalStyle />
      <BackHeader title={`우리집 관리하기`} pageurl={"/mypage"} />
      <Container>
        <Top>
          <Text>우리집 코드</Text>
          <Code>
            <p>{housecode}</p>
            <img src={Copy} alt="Copy" onClick={handleCopyCode} />{" "}
            {/* Copy 클릭 시 handleCopyCode 실행 */}
          </Code>
        </Top>
        <Top>
          <Text>식구들</Text>
          {familyProfiles.map((profile) => (
            <Container2 key={profile.userid}>
              <Wrapper2>
                <Img
                  src={characterImages[profile.characterImage]}
                  alt={`${profile.nickname}의 캐릭터`}
                />
                <NameWrapper>
                  <Name>{profile.nickname}</Name>
                </NameWrapper>
              </Wrapper2>
              <DeleteImg
                src={Delete}
                alt="삭제 버튼"
                onClick={() => handleDelete(profile.userid)} // 삭제 버튼 클릭 시 handleDelete 실행
              />
            </Container2>
          ))}
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
  min-width: 390px;
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

  img {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container2 = styled.div`
  display: flex;
  padding: 20px 24px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
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
  cursor: pointer;
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
