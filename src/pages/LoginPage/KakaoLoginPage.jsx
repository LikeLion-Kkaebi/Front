import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KakaoLogin } from "../../api/auth";

const LoginKakaoPage = () => {
  const urlParams = new URL(window.location.toString()).searchParams;
  const AUTHORIZATION_CODE = urlParams.get("code");

  const navigate = useNavigate();

  const getData = async () => {
    const response = await KakaoLogin(AUTHORIZATION_CODE, navigate);
  };

  useEffect(() => {
    getData();
  }, []);

  return <></>;
};

export default LoginKakaoPage;
