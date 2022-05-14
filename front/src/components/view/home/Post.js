import styled from "styled-components";
import TagBtn from "./TagBtn";

function Post() {
    return (
        <PostContainer>
            <TagBtn />
            <PostTitle>HTML/CSS의 기본 문법 학습 (1)</PostTitle>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 100%;
    min-height: 30%;
    padding: 5% 10%;
`;

const PostTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1%;
`;

export default Post;
