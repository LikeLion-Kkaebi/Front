import { axiosInstance } from "../api/http";

//GET
// GET : 카카오 로그인
export const KakaoLogin = async (code) => {
  try {
    const response = await axiosInstance.get(
      `accounts/login/kakao/callback/?code=${code}`
    );

    console.log(response.data);

    localStorage.setItem("user_id", response.data.data.id);
    localStorage.setItem("nickname", response.data.data.nickname);
    localStorage.setItem("token", response.data.data.access_token);

    window.location.replace("/signupname");

    return Promise.resolve(response.data);
  } catch (error) {
    console.error("Login failed:", error);

    // Handle error (e.g., show an alert or redirect to an error page)
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    window.location.replace("/"); // Redirect to an error page or a fallback
    return Promise.reject(error);
  }
};

//PATCH
// PATCH : 닉네임 수정 / 카카오 닉네임 생성
export const PatchNickname = async (nickname) => {
  try {
    const response = await axiosInstance.patch("/accounts/update/nickname/", {
      nickname: nickname,
    });
    console.log(response.data);
    localStorage.setItem("nickname", response.data.data.nickname);
    return Promise.resolve(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error.non_field_errors);
    }
    console.error(error.response);
  }
};

// DELETE : 카카오 회원 탈퇴
export const DelKakaoAccount = async () => {
  try {
    const response = await axiosInstance.post("/accounts/kakao/delete/");
    console.log(response.data);
    alert("회원탈퇴가 완료되었습니다.");
    window.localStorage.clear();
    window.location.replace("/");
    return Promise.resolve(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error.non_field_errors);
    }
    console.error(error.response);
  }
};
