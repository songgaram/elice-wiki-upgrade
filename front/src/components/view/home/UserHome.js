import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/userAction";
import Loader from "../../Loader";
import WeekList from "./WeekList";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import Post from "./Post";
import { getTags } from "./HomeData";
import styled from "styled-components";
import * as Api from "../../../api";

function UserHome() {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState(undefined);
    const [goal, setGoal] = useState(undefined);
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [page, setPage] = useState(1);

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

    const getPosts = async () => {
        try {
            const { data } = await Api.getQuery(
                "posts",
                `page=${page}&perPage=10`
            );
            setPosts((prev) => [...prev, ...data.payload.postListInfo]);
        } catch (e) {
            console.log("Post-List를 가져오는데 실패하였습니다.", e);
        }
    };
    useEffect(() => {
        if (!userAuthorized) {
            navigate("/auth");
            return;
        }
        getTags(setTags);
        setIsFetchCompleted(true);
    }, []);

    const getNextpage = () => {
        setPage((curr) => curr + 1);
    };

    const getMorePosts = async () => {
        setIsLoaded(true);
        await getPosts(setPosts, page);
        setIsLoaded(false);
    };

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            getNextpage();
            observer.unobserve(entry.target);
            await getMorePosts();
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        let observer;
        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.4,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);

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
                            <TargetElement ref={setTarget}>
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

const TargetElement = styled.div`
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
