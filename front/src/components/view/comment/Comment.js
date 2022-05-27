import { Card, CardHeader } from "@mui/material";
import SingleComment from "./SingleComment";
import CommentAddForm from "./CommentAddForm";

function Comments({ boardId, commentList }) {
    return (
        <>
            <Card sx={{ width: "100%" }}>
                <CardHeader title="댓글" />
                <CommentAddForm boardId={boardId} />
                {commentList?.map((commentData) => (
                    <SingleComment key={commentData.commentId} commentData={commentData} />
                ))}
            </Card>
        </>
    );
}

export default Comments;
