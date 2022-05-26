import { useEffect, useState } from "react";
import { Card, CardHeader } from "@mui/material";
// import CommentCard from "./CommentCard";
// import CommentAddForm from "./CommentAddForm";
import * as Api from "../../../api";

function Comments({ boardId }) {
  //   const [commentList, setCommentList] = useState(undefined);
  //   const fetchCommentList = async () => {
  //     try {
  //       const { data } = await Api.get("commentlist", boardId);
  //       setCommentList(data.payload);
  //     } catch (e) {}
  //   };
  //   useEffect(() => {
  //     fetchCommentList();
  //   }, []);
  //   return (
  //     <>
  //       <Card sx={{ width: "100%" }}>
  //         <CardHeader title="댓글" />
  //         <CommentAddForm />
  //         {commentList?.map((comment) => (
  //           <CommentCard
  //             userName={comment.user_id.user_name}
  //             userId={comment.user_id._id}
  //             content={comment.content}
  //             key={comment._id}
  //             commentId={comment._id}
  //           />
  //         ))}
  //       </Card>
  //     </>
  //   );
}

export default Comments;
