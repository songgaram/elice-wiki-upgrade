import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/userAction";
import Loader from "../../Loader";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import PostList from "./PostList";
import { getPosts, getTags } from "./HomeData";
import WeekNav from "./WeekNav";
import { Button } from "@mui/material";
import styled from "styled-components";

function UserHome() {
    const [tags, setTags] = useState(undefined);
    const [goal, setGoal] = useState(undefined);

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const userAuthorized = userState?.authorized;

    const handleLogout = () => {
        // dispatch 함수를 이용해 로그아웃함.
        dispatch(logoutUser());
        // 기본 페이지로 돌아감.
        navigate("/");
    };

    useEffect(() => {
        if (!userAuthorized) {
            navigate("/auth");
            return;
        }
        getTags(setTags);
        setIsFetchCompleted(true);
    }, []);

    if (!isFetchCompleted) {
        return <div>로딩중</div>;
    }

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }}>
                    <button onClick={() => handleLogout()}>로그아웃</button>
                </header>
                <WeekNav />
                <Container>
                    <ContentsSide>
                        <div style={{ padding: "0 3%" }}>
                            <TagBtn tags={tags} />
                        </div>
                    </ContentsSide>
                    <Contents>
                        <Outlet />
                    </Contents>
                    <ContentsSide>{goal && <Goal goal={goal} />}</ContentsSide>
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
    overflow-y: scroll;
    overflow-x: hidden;
    // &::-webkit-scrollbar {
    //     width: 10px;
    // }
    // &::-webkit-scrollbar-track {
    //     background: #f1f1f1;
    //     margin-left: -10px;
    // }
    &::-webkit-scrollbar-thumb {
        background: #7353ea;
    }
    // &::-webkit-scrollbar-thumb:hover {
    //     background: #555;
    // }
`;
