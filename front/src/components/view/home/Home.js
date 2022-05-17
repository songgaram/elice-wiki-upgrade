import styled from "styled-components";
import PostList from "./PostList";
import WeekList from "./WeekList";

const Home = () => {
    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }} />
                <WeekList />
                <Container>
                    <ContentsSide />
                    <Contents>
                        <PostList />
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
    background-color: #e1e1e1;
`;

const ContentsSide = styled.div`
    width: 25%;
    background-color: white;
`;

const Contents = styled.div`
    width: 50%;
    background-color: #f1f1f1;
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
