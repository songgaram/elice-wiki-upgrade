import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import * as Api from "../../../api";

function CommentAddForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [comment, setComment] = useState("");
    const boardId = params.id;

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await Api.post(`comments/comment`, {
                boardId,
                content: comment,
            });
            navigate(`/board/${boardId}`);
            setComment("");
        } catch (error) {
            alert("댓글 생성에 실패하였습니다.");
            console.log(error);
        }
    };
    return (
        <form onSubmit={handlePost}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                    sx={{ m: "1% 0 1% 1%", width: "100%" }}
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button sx={{ m: "1%" }} type="submit">
                    완료
                </Button>
            </div>
        </form>
    );
}

export default CommentAddForm;
