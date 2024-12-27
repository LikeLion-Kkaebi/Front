import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// props로 받아올 모달창 상태 변경 함수 구조 분해 할당
const PremiumModal = ({ setModal, goPremium }) => {
  const toggleModal = () => {
    setModal(false);
  };

  const handleSignup = async () => {
    try {
      await goPremium(); // 회원가입 요청 실행
      toggleModal(); // 모달 닫기
    } catch (error) {
      console.error("업그레이드 오류:", error);
    }
  };

  return (
    <Wrapper>
      <ModalBackground onClick={toggleModal} />
      <ModalWrapper>
        <ModalTop>업그레이드하기</ModalTop>
        <ModalDiv>
          <p>
            플랜 업그레이드를 <br />
            하시겠습니까?
          </p>

          <Button>
            <NoBtn onClick={toggleModal}>아니오</NoBtn>
            <YesBtn onClick={handleSignup}>예</YesBtn>
          </Button>
        </ModalDiv>
      </ModalWrapper>
    </Wrapper>
  );
};

export default PremiumModal;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 51; /* 헤더보다 위에 표시되도록 설정 */
`;

const ModalBackground = styled.div`
  position: fixed; /* 화면 전체를 덮도록 고정 */
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 9; /* 모달창보다 뒤에 위치 */
`;

const ModalWrapper = styled.div`
  width: 286px;
  height: 186px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  position: relative;
  z-index: 10; /* ModalBackground보다 위에 표시되도록 설정 */
`;

const ModalTop = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: #aa91e8;
  width: 286px;
  height: 52px;
  position: absolute;
  top: 0;
  z-index: 11; /* ModalWrapper 내부에서 가장 위에 표시 */
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 52px; /* 중앙 정렬 */
`;

const ModalDiv = styled.div`
  width: 286px;
  height: 134px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  p {
    margin-bottom: 18px;
    line-height: 150%;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-around;
  width: 205px;
`;

const NoBtn = styled.div`
  border-radius: 5px;
  border: 1px solid #f2f2f2;
  background: #f7f7f7;
  width: 87px;
  height: 30px;
  color: #bbb;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  cursor: pointer;
`;

const YesBtn = styled.div`
  border-radius: 5px;
  border: 1px solid #e1ddeb;

  background: #eae6f3;
  width: 87px;
  height: 30px;
  color: #aa91e8;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  cursor: pointer;
`;
