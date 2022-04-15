import { boardModel } from "../db/models/board/board";
import { v4 as uuidv4 } from "uuid";
import { addError, findError } from "../utils/errorMessages";

class boardService {
    static async addBoard({ userId, postId, title, body }) {
        if (
            userId == undefined ||
            postId == undefined ||
            title == undefined ||
            body == undefined
        ) {
            const errorMessage = addError("게시판");
            throw new Error(errorMessage);
        }
        const boardId = uuidv4();
        const newBoard = { boardId, userId, postId, title, body };
        const insertedBoard = await boardModel.insertBoard({ newBoard });

        return insertedBoard;
    }

    static async getBoard({ boardId }) {
        const board = await boardModel.findByBoardId({ boardId });
        if (!board) {
            const errorMessage = findError("게시판");
            throw new Error(errorMessage);
        }
        return board;
    }

    static async getBoardList({ userId }) {
        const boardList = await boardModel.findByUserId({ userId });
        return boardList;
    }

    static async setBoard({ boardId, toUpdate }) {
        let board = await boardModel.findByBoardId({ boardId });
        if (!board) {
            const errorMessage = findError("게시판");
            throw new Error(errorMessage);
        }

        if (toUpdate.postId) {
            const fieldToUpdate = "postId";
            const newValue = toUpdate.postId;
            board = await boardModel.update({
                boardId,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            board = await boardModel.update({
                boardId,
                fieldToUpdate,
                newValue,
            });
        }

        if (toUpdate.body) {
            const fieldToUpdate = "body";
            const newValue = toUpdate.body;
            board = await boardModel.update({
                boardId,
                fieldToUpdate,
                newValue,
            });
        }

        return board;
    }

    static async deleteBoard({ boardId }) {
        const deletedResult = await boardModel.deleteByBoardId({ boardId });
        if (!deletedResult) {
            const errorMessage = findError("게시판");
            throw new Error(errorMessage);
        }

        return deletedResult;
    }
}

export { boardService };
