import { boardModel } from "../db/models/board/board";
import { v4 as uuidv4 } from "uuid";

class boardService {
  static async addBoard({ userId, postId, title, body }) {
    const boardId = uuidv4();
    const newBoard = { boardId, userId, postId, title, body };
    const insertedBoard = await boardModel.insertBoard({ newBoard })
    // insertedBoard.errorMessage = null;

    return insertedBoard;
  }
}

export { boardService };