import { Card, CardHeader } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentAddForm from "./CommentAddForm";

function Comments({ boardId, commentList }) {
    return (
        <>
            <Card sx={{ width: "100%" }}>
                <CardHeader title="댓글" />
                <CommentAddForm boardId={boardId} />
                {commentList?.map((comment) => (
                    <CommentCard key={comment.commentId} comment={comment} />
                ))}
            </Card>
        </>
    );
}

export default Comments;
