import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GlobalStyle from "../style/GlobalStyle";
import BackHeader from "../components/BackHeader";
import NotificationIcon from "../images/NotificationIcon.svg"; // Add the appropriate icon path

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch mock data from public/notification.json
    fetch("/notification.json")
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const newNotifications = notifications.filter((notif) => notif.is_new);
  const pastNotifications = notifications.filter((notif) => !notif.is_new);

  return (
    <>
      <GlobalStyle />
      <BackHeader title="알림" pageurl={"/homemain"} />
      <Container>
        {/* 새로운 알림( 오늘 알림 ) */}
        {newNotifications.length > 0 && (
          <Section>
            <SectionTitle>새로운 알림</SectionTitle>
            {newNotifications.map((notif) => (
              <NotificationItem key={notif.alert_id}>
                <Icon src={NotificationIcon} alt="Notification Icon" />
                <Content>
                  <Message>{notif.message}</Message>
                  <Time>{notif.time}</Time>
                </Content>
              </NotificationItem>
            ))}
          </Section>
        )}

        {/*  지난 알림( 오늘 기준 3일 이내 날짜 알림 ) */}
        {pastNotifications.length > 0 && (
          <Section>
            <SectionTitle>지난 알림</SectionTitle>
            {pastNotifications.map((notif) => (
              <NotificationItem key={notif.alert_id}>
                <Icon src={NotificationIcon} alt="Notification Icon" />
                <Content>
                  <Message>{notif.message}</Message>
                  <Time>
                    {new Date(notif.absolute_time).toLocaleDateString()}
                  </Time>
                </Content>
              </NotificationItem>
            ))}
          </Section>
        )}
      </Container>
    </>
  );
};

export default NotificationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fafafa;
`;

const Section = styled.div`
  margin-bottom: 4px;
`;

const SectionTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.5px;
  align-self: stretch;
  margin-bottom: 16px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

const Time = styled.div`
  align-self: stretch;
  color: #aa91e8;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.5px;
`;
