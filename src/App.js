import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import "./style/normalize.css";

import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupIntroPage from "./pages/SignupPage/SignupIntroPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import SignupNamePage from "./pages/SignupPage/SignupNamePage.jsx";
import SignupCodeInputPage from "./pages/SignupPage/SignupCodeInputPage.jsx";
import SignupSetHomePage from "./pages/SignupPage/SignupSetHomePage.jsx";
import SignupGenerateCodePage from "./pages/SignupPage/SignupGenerateCodePage.jsx";
import SignupCharacterPage from "./pages/SignupPage/SignupCharacterPage.jsx";
import SignupBestWorkPage from "./pages/SignupPage/SignupBestWorkPage.jsx";
import SignupKkaebiCommentPage from "./pages/SignupPage/SignupKkaebiCommentPage.jsx";

import HomeMainPage from "./pages/HomePage/HomeMainPage.jsx";
import HomeStatisticsPage from "./pages/HomePage/HomeStatisticsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import MyPage from "./pages/MyPage.jsx";

import DayPage from "./pages/DayPage.jsx";
import MakeTodoPage from "./pages/MakeTodoPage/MakeTodoPage.jsx";
import WhereTodoPage from "./pages/MakeTodoPage/WhereTodoPage.jsx";
import WhatTodoPage from "./pages/MakeTodoPage/WhatTodoPage.jsx";
import WhoTodoPage from "./pages/MakeTodoPage/WhoTodoPage.jsx";
import AskTodoPage from "./pages/MakeTodoPage/AskTodoPage.jsx";
import FamilyPage from "./pages/FamilyPage.jsx";
import UpgradePage from "./pages/UpgradePage.jsx";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* 로그인 및 회원가입 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signupintro" element={<SignupIntroPage />} />
          <Route path="/signupname" element={<SignupNamePage />} />
          <Route path="/signupcodeinput" element={<SignupCodeInputPage />} />
          <Route path="/signupsethome" element={<SignupSetHomePage />} />
          <Route
            path="/signupgeneratecode"
            element={<SignupGenerateCodePage />}
          />
          <Route path="/signupcharacter" element={<SignupCharacterPage />} />
          <Route path="/signupbestwork" element={<SignupBestWorkPage />} />
          <Route
            path="/signupkkaebicomment"
            element={<SignupKkaebiCommentPage />}
          />

          {/* 홈페이지 */}
          <Route path="/homemain" element={<HomeMainPage />} />
          <Route path="/homestatistics" element={<HomeStatisticsPage />} />

          {/* 알림페이지 */}
          <Route path="/notification" element={<NotificationPage />} />

          {/* 캘린더 */}
          <Route path="/month" element={<CalendarPage />} />
          <Route path="/day" element={<DayPage />} />
          <Route path="/maketodo" element={<MakeTodoPage />} />
          <Route path="/wheretodo" element={<WhereTodoPage />} />
          <Route path="/whattodo" element={<WhatTodoPage />} />
          <Route path="/whotodo" element={<WhoTodoPage />} />
          <Route path="/asktodo" element={<AskTodoPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
