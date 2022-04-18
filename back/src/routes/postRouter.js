import { Router } from "express";
import { postController } from "../controller/postController";

const postRouter = Router();

postRouter.post("/addPost", postController.addPost);

postRouter.get("/post/:postId", postController.getPostByPostId);

// post 수정

// week로 post 검색
postRouter.get("/post/week/:week", postController.getPostByWeek);

export { postRouter };
