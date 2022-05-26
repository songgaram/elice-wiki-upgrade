import { useEffect, useState } from "react";
import { Card, CardHeader } from "@mui/material";
import CommentCard from "./CommentCard";
// import CommentAddForm from "./CommentAddForm";
import * as Api from "../../../api";

function Comments({ boardId }) {
  const [commentList, setCommentList] = useState(undefined);
  const fetchCommentList = async () => {
    try {
      const { data } = await Api.get("commentlist", boardId);
      setCommentList(data.payload);
    } catch (e) {
      console.log("댓글을 불러오는데 실패했습니다.", e);
    }
  };
  useEffect(() => {
    fetchCommentList();
  }, []);
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardHeader title="댓글" />
        {/* <CommentAddForm /> */}
        {commentList?.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        ))}
      </Card>
    </>
  );
}

export default Comments;
