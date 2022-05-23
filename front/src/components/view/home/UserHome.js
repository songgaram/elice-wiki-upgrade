import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/userAction";
import Loader from "../../Loader";
import WeekList from "./WeekList";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import Post from "./Post";
import { Button } from "@mui/material";
import { getTags } from "./HomeData";
import styled from "styled-components";
import * as Api from "../../../api";

function UserHome() {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState(undefined);
    const [goal, setGoal] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const userAuthorized = userState?.authorized;
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const handleLogout = () => {
        // dispatch 함수를 이용해 로그아웃함.
        dispatch(logoutUser());
        // 기본 페이지로 돌아감.
        navigate("/");
    };

    const getPosts = async (page) => {
        try {
            const { data } = await Api.getQuery(
                "posts",
                `page=${page}&perPage=10`
            );
            setPosts((prev) => [...prev, ...data.payload.postListInfo]);
            setLoading(true);
            setTotalPage(data.payload.totalPage);
            setIsLoaded(false);
        } catch (e) {
            console.log("Post-List를 가져오는데 실패하였습니다.", e);
        }
    };

    // useEffect(() => {
    //     console.log(totalPage);
    // }, [totalPage]);

    const loadMore = () => {
        setPage((curr) => curr + 1);
    };

    useEffect(() => {
        if (!userAuthorized) {
            navigate("/auth");
            return;
        }
        getTags(setTags);
        getPosts(page);
        setIsFetchCompleted(true);
    }, [page]);

    const target = useRef();
    let num = 1;
    useEffect(() => {
        if (loading) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsLoaded(true);
                        loadMore();
                        num++;
                        if (num >= totalPage) {
                            observer.unobserve(target.current);
                        }
                    }
                },
                { threshold: 0.5 }
            );
            observer.observe(target.current);
        }
    }, [loading, num]);

    if (!isFetchCompleted) {
        return <div>로딩중</div>;
    }

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }}>
                    <button onClick={() => handleLogout()}>로그아웃</button>
                </header>
                <WeekList setPosts={setPosts} posts={posts} setGoal={setGoal} />
                <Container>
                    <ContentsSide>
                        <div style={{ padding: "0 3%" }}>
                            <TagBtn tags={tags} />
                        </div>
                    </ContentsSide>
                    <Contents>
                        <>
                            {posts &&
                                posts.map((post, idx) => (
                                    <Post
                                        key={`post_${idx}`}
                                        post={post}
                                        idx={idx}
                                    />
                                ))}

                            <TargetElement ref={target}>
                                {isLoaded && <Loader />}
                            </TargetElement>
                        </>
                    </Contents>
                    <ContentsSide>{goal && <Goal goal={goal} />}</ContentsSide>
                </Container>
            </div>
        </>
    );
}

export default UserHome;

const TargetElement = styled(Button)`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

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
