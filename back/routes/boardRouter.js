import { Router } from "express";
import { boardController } from "../controller/boardController";

const boardRouter = Router();

boardRouter.post("/boards/board", boardController.addBoard);
boardRouter.get("/boards/:boardId", boardController.getBoard);
boardRouter.get("/boardlist/:userId", boardController.getBoardList);
boardRouter.put("/boards/:boardId", boardController.setBoard);

export { boardRouter };
