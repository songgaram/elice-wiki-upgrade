import { useEffect } from "react";
import Loader from "components/Loader";
import { useGetWeekPosts } from "queries/postQuery";
import Post from "./Post";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function WeekPost() {
    const params = useParams();
    const week = params.week;

    const { data, status, fetchNextPage, isFetchingNextPage } = useGetWeekPosts(week);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) fetchNextPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    if (status === "loading") return <Loader />;

    return (
        <>
            {data?.pages
                ?.flatMap((page) => {
                    return page.postListInfo;
                })
                .map((post, idx) => (
                    <Post post={post} idx={idx} key={post.post_id} />
                ))}

            {isFetchingNextPage ? <Loader /> : <TargetElement ref={ref}></TargetElement>}
        </>
    );
}

const TargetElement = styled.div`
    width: 100%;
    height: 50px;
`;

export default WeekPost;
