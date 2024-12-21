import React, { useEffect } from "react";

import { KakaoLogin } from "../../api/user";

const KakaoLoginPage = () => {
  const urlParams = new URL(window.location.toString()).searchParams;
  const AUTHORIZATION_CODE = urlParams.get("code");

  const getData = async () => {
    try {
      const response = await KakaoLogin(AUTHORIZATION_CODE);
      console.log(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (AUTHORIZATION_CODE) {
      getData();
    } else {
      console.error("Authorization code is missing.");
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      window.location.replace("/");
    }
  }, [AUTHORIZATION_CODE]);

  return <></>;
};

export default KakaoLoginPage;
