import styled from "styled-components";
import TagBtn from "./TagBtn";

function Post({ data }) {
    const { title, tag } = data;

    return (
        <PostContainer>
            <TagBtn tag={tag} />
            <PostTitle>{title}</PostTitle>
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
