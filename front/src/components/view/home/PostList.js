import Post from "./Post";

function PostList({ posts }) {
    return (
        <>
            {posts?.map((post, idx) => (
                <Post post={post} idx={idx} />
            ))}
        </>
    );
}

export default PostList;
