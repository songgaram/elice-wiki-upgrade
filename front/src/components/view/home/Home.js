import { useEffect, useState } from "react";
import styled from "styled-components";
import PostList from "./PostList";
import WeekList from "./WeekList";
import { getPosts, getTags } from "./HomeData";
import TagBtn from "./TagBtn";

const Home = () => {
    const [posts, setPosts] = useState(undefined);
    const [tags, setTags] = useState(undefined);

    useEffect(() => {
        getPosts(setPosts);
        getTags(setTags);
    }, []);

    useEffect(() => {
        console.log(tags);
    }, [tags]);

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }} />
                <WeekList setPosts={setPosts} posts={posts} />
                <Container>
                    <ContentsSide>
                        <div style={{ padding: "0 4%" }}>
                            {/* <TagBtn tags={tags} /> */}
                        </div>
                    </ContentsSide>
                    <Contents>
                        <PostList posts={posts} />
                    </Contents>
                    <ContentsSide />
                </Container>
            </div>
        </>
    );
};

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
    padding-top: 5%;
    flex-direction: column;
    align-items: center;
`;

const Contents = styled.div`
    width: 50%;
    overflow: scroll;
    // &::-webkit-scrollbar {
    //     width: 10px;
    // }
    // &::-webkit-scrollbar-track {
    //     background: #f1f1f1;
    //     margin-left: -10px;
    // }
    // &::-webkit-scrollbar-thumb {
    //     background: #7353ea;
    // }
    // &::-webkit-scrollbar-thumb:hover {
    //     background: #555;
    // }
`;

export default Home;
