import { useEffect, useState } from "react";
import Post from "./Post";
import * as Api from "../../../api";

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
