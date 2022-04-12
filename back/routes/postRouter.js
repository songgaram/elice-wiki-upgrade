import { Router } from "express";

import { postController } from "../controller/postController";
const postRouter = Router();

postRouter.post("/addPost", postController.addPost);

// 태그로 검색: params로 tag받기
postRouter.get("/getPost/:tag", postController.getPostByTag);

export { postRouter };
