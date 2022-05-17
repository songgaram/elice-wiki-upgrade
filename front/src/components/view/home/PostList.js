import Post from "./Post";

function PostList({ posts }) {
    return (
        <>
            {posts?.map((post) => (
                <Post post={post} />
            ))}
        </>
    );
}

export default PostList;
