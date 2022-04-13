import { Router } from "express";
import { boardController } from "../controller/boardController";

const boardRouter = Router();

boardRouter.post("/boards/board", boardController.addBoard);

export { boardRouter };
