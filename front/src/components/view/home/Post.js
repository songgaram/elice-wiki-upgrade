import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TagBtn from "./TagBtn";

function Post({ post, idx }) {
  const { title, tag, post_id } = post;
  const navigate = useNavigate();
  return (
    <PostContainer
      idx={idx}
      onClick={() => {
        navigate(`/post/${post_id}`);
      }}
    >
      <TagBtn tags={tag} />
      <PostTitle>{title}</PostTitle>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  min-height: 30%;
  padding: 5% 10%;
  border-top: ${(props) => (props.idx === 0 ? "none" : "1px solid #e1e1e1")};
`;

const PostTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1%;
`;

export default Post;
