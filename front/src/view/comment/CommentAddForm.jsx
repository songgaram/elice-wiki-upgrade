import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentInput from "./CommentInput";
import { usePostComment } from "queries/commentQuery";

function CommentAddForm({ boardId }) {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const postComment = usePostComment();

    const handlePost = async (e) => {
        e.preventDefault();

        const COMMENT_DATA = {
            boardId,
            content: comment,
        };

        postComment.mutate(COMMENT_DATA);
        navigate(`/board/${boardId}`);
        setComment("");
    };

    return (
        <form onSubmit={handlePost}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <CommentInput comment={comment} setComment={setComment} />
            </div>
        </form>
    );
}

export default CommentAddForm;
