import React from "react";
import MyInfo from "./MyInfo";
import MyPostList from "./MyPostList";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MyPage = () => {
    const user = useSelector((state) => (state ? state.userReducer.user : undefined));
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Header />
            <MyInfo user={user} />
            <MyPostList user={user} />
        </div>
    );
};

const Header = styled.div`
    width: 100vw;
    height: 10vh;
`;
export default MyPage;
