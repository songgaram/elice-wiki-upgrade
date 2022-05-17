import { useEffect, useState } from "react";
import Post from "./Post";
import * as Api from "../../../api";

function PostList() {
    const [posts, setPosts] = useState(undefined);

    const getPosts = async () => {
        try {
            const { data } = await Api.get("posts");
            setPosts(data.payload);
        } catch (e) {
            console.log("Post를 가져오는데 실패하였습니다.", e);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {posts?.map((post) => (
                <Post post={post} />
            ))}
        </>
    );
}

export default PostList;
