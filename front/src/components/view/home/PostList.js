import Post from "./Post";

function PostList({ posts }) {
    return (
        <>
            {posts.map((post, idx) => (
                <Post key={`post_${idx}`} post={post} idx={idx} />
            ))}
        </>
    );
}

export default PostList;
