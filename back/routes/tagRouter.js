import { Router } from "express";
import { tagController } from "../controller/tagController";

const tagRouter = Router();

tagRouter.get("/tag/:tag", tagController.getAllPostId);

export { tagRouter };
