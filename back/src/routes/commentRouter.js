import { Router } from "express";
import { commentController } from "../controller/commentController";

const commentRouter = Router();

commentRouter.post("/comments/comment", commentController.addComment);
commentRouter.get("/comments/:commentId", commentController.getComment);
commentRouter.get("/commentlist/:boardId", commentController.getCommentList);
commentRouter.put("/comments/:commentId", commentController.setComment);
commentRouter.delete("/comments/:commentId", commentController.deleteComment);

export { commentRouter };
