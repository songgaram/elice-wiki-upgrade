import { Router } from "express";

import { postController } from "../controller/postController";
const postRouter = Router();

postRouter.post("/addPost", postController.addPost);

postRouter.post("/postByTag", postController.getPostByTag);

export { postRouter };
