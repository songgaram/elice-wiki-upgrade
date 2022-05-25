import { useEffect, useState, useCallback } from "react";
// import { getWeekPosts } from "./HomeData";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";
import { Button } from "@mui/material";
import styled from "styled-components";
import Post from "./Post";
import * as Api from "../../../api";

function WeekPost() {
    const [posts, setPosts] = useState([]);
    // const [goal, setGoal] = useState(undefined);
    // const [observing, setObserving] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();
    // const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const params = useParams();
    const week = params.week;

    //     const weekState = useSelector((state) =>
    //     state ? state.weekReducer : undefined
    // );

    // const fetchSetState = (data) => {
    //     setPosts((prev) => [...prev, ...data.payload.postListInfo]);
    //     setObserving(true);
    //     setTotalPage(data.payload.totalPage);
    //     setIsLoaded(false);
    // };

    const getWeekPosts = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await Api.getQuery(
                `post/week/${week}`,
                `page=${page}&perPage=10`
            );
            setPosts(data.payload.postListInfo);
            setLoading(false);
            // isFetchCompleted(true);
        } catch (e) {
            console.log("Week-Post를 가져오는데 실패하였습니다.", e);
        }
    }, [page]);

    useEffect(() => {
        getWeekPosts();
    }, [getWeekPosts, week]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage((prevState) => prevState + 1);
        }
    }, [inView, loading]);

    // useEffect(() => {
    //     if (observing) {
    //         const observer = new IntersectionObserver(
    //             (entries) => {
    //                 if (entries[0].isIntersecting) {
    //                     setIsLoaded(true);
    //                     loadMore();
    //                     num++;
    //                     if (num >= totalPage) {
    //                         observer.unobserve(target.current);
    //                     }
    //                 }
    //             },
    //             { threshold: 0.5 }
    //         );
    //         observer.observe(target.current);
    //     }
    // }, [observing, num]);

    // if (!isFetchCompleted) {
    //     return <div>로딩중</div>;
    // }

    return (
        <>
            {posts.map((post, idx) => (
                <>
                    {post.length - 1 == idx ? (
                        <Post
                            key={`post_${idx}`}
                            post={post}
                            idx={idx}
                            ref={ref}
                        />
                    ) : (
                        <Post key={`post_${idx}`} post={post} idx={idx} />
                    )}
                </>
            ))}
            {/* <TargetElement ref={target}>{isLoaded && <Loader />}</TargetElement> */}
        </>
    );
}

// const TargetElement = styled(Button)`
//     width: 100%;
//     height: 50px;
//     display: flex;
//     justify-content: center;
//     text-align: center;
//     align-items: center;
// `;

export default WeekPost;
