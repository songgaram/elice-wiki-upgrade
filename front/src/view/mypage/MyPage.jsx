import React from "react";
import MyInfo from "./MyInfo";
import MyPostList from "./MyPostList";
import styled from "styled-components";
import Loader from "components/Loader";
import { useGetCurrentUser } from "queries/userQuery";
import { useDeleteUserHandler } from "queries/userQuery";

const MyPage = () => {
    const deleteUserHandler = useDeleteUserHandler();

    const { data, status } = useGetCurrentUser();
    const user = data?.userState?.payload;

    const deleteAccount = async () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            deleteUserHandler.mutate();
        }
    };

    if (status === "loading") return <Loader />;

    return (
        <Wrapper>
            <Logo>MyPage</Logo>
            <MyInfo user={user} />
            <MyPostList user={user} />
            <Delete onClick={deleteAccount}>탈퇴하기</Delete>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Delete = styled.p`
    color: #922820;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    margin-bottom: 100px;
    &:hover {
        opacity: 0.5;
    }
`;
const Logo = styled.div`
    color: #7353ea;
    font-weight: bold;
    font-size: 2rem;
    align-self: flex-start;
    margin-top: 70px;
    margin-left: 120px;
    user-select: none;
`;

export default MyPage;
