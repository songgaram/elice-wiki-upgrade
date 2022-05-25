import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/userAction";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import { getTags } from "./HomeData";
import WeekNav from "./WeekNav";
import styled from "styled-components";
import Header from "../Header";
import RecentList from "./RecentList";

function UserHome() {
  const [tags, setTags] = useState(undefined);
  const [goal, setGoal] = useState(undefined);

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch 함수를 이용해 로그아웃함.
    dispatch(logoutUser());
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  useEffect(() => {
    getTags(setTags);
    setIsFetchCompleted(true);
  }, []);

  if (!isFetchCompleted) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", height: "auto" }}>
        <Header />
        <WeekNav setGoal={setGoal} />
        <Container>
          <ContentsSide>
            <div style={{ padding: "0 3%" }}>
              <TagBtn tags={tags} />
            </div>
          </ContentsSide>
          <Contents>
            <Outlet />
          </Contents>
          <ContentsSide>
            {goal && <Goal goal={goal} />} <RecentList />
          </ContentsSide>
        </Container>
      </div>
    </>
  );
}

export default UserHome;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 100px);
`;

const ContentsSide = styled.div`
  width: 25%;
  background-color: white;
  display: flex;
  padding: 2% 1%;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  width: 50%;
`;
