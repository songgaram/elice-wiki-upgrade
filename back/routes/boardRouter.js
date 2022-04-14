import { Router } from "express";
import { boardController } from "../controller/boardController";

const boardRouter = Router();

boardRouter.post("/boards/board", boardController.addBoard);
boardRouter.get("/boards/:boardId", boardController.getBoard);

export { boardRouter };
