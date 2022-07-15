import { useEffect } from "react";
import Loader from "components/Loader";
import { useGetPostList } from "queries/postQuery";
import Post from "./Post";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

function HomePost() {
    const { data, status, fetchNextPage, isFetchingNextPage } = useGetPostList();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) fetchNextPage();
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

export default HomePost;
