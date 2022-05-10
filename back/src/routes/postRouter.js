import { Router } from "express";
import { postController } from "../controller/postController";

const postRouter = Router();

// new post
postRouter.post("/addPost", postController.addPost);

// findByPostId
postRouter.get("/post/:postId", postController.getPostByPostId);

postRouter.get("/post/tag/:tag", postController.getPostsByTag);

// week로 post 검색
postRouter.get("/post/week/:week", postController.getPostByWeek);

export { postRouter };
