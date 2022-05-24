import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import Loader from "../../Loader";
import { getPosts } from "./HomeData";

function PostList({ posts, setPosts, page, setPage, perPage }) {
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getNextpage = () => {
    setPage((curr) => curr + 1);
  };

  const getMorePosts = async () => {
    setIsLoaded(true);
    await getPosts(setPosts, page, perPage);
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMorePosts();
      getNextpage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <>
      {posts?.map((post, idx) => (
        <Post key={`post_${idx}`} post={post} idx={idx} />
      ))}
      <TargetElement ref={setTarget}>{isLoaded && <Loader />}</TargetElement>
    </>
  );
}

const TargetElement = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export default PostList;
