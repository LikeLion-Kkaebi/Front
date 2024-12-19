import React, { useEffect } from "react";

import { KakaoLogin } from "../../api/user";

const KakaoLoginPage = () => {
  const urlParams = new URL(window.location.toString()).searchParams;
  const AUTHORIZATION_CODE = urlParams.get("code");

  const getData = async () => {
    const response = await KakaoLogin(AUTHORIZATION_CODE);
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return <></>;
};

export default KakaoLoginPage;
