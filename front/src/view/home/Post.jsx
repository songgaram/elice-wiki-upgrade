import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TagBtn from "./tag/TagBtn";

function Post({ post, idx }) {
    const { title, tag, post_id } = post;
    const navigate = useNavigate();
    return (
        <PostContainer idx={idx}>
            <TagBtn tags={tag} />
            <PostTitle
                onClick={() => {
                    navigate(`/post/${post_id}`);
                }}
            >
                {title}
            </PostTitle>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 100%;
    height: 250px;
    padding: 40px 10% 10% 10%;
    border-top: ${(props) => (props.idx === 0 ? "none" : "1px solid #e1e1e1")};
`;

const PostTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1%;
    cursor: pointer;

    @media screen and ${({ theme }) => theme.breakPoint} {
        font-size: 25px;
    }
`;

export default Post;
