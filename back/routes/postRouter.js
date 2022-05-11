import { Router } from "express";

import { postController } from "../controller/postController";
const postRouter = Router();

postRouter.post("/addPost", postController.addPost);

postRouter.get("/post/:postId", postController.getPostByPostId);

// post 수정

export { postRouter };
