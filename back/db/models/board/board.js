import models, { Sequelize } from "../index";

// const Op = Sequelize.Op;

class boardModel {
    // board 추가
    static async insertBoard({ newBoard }) {
        const insertBoard = await models.Board.create(newBoard)
            .then(() => console.log("board is created"))
            .catch((err) => console.log(err.message));
        return insertBoard;
    }
    // boardId로 조회
    static async findByBoardId({ boardId }) {
        const board = await models.Board.findOne({ where: { boardId } });
        return board;
    }
    // userId로 조회
    static async findByUserId({ userId }) {
        const boardList = await models.Board.findAll({ where: { userId } });
        return boardList;
    }
    // board 수정
    static async update({ boardId, fieldToUpdate, newValue }) {
        const filter = { boardId };
        const update = { [fieldToUpdate]: newValue };
        // const option = { returnOriginal: false };
        console.log(filter, update);
        const updatedBoard = await models.Board.update(update, {
            where: filter,
        });
        console.log(updatedBoard);
        return updatedBoard;
    }
    // boardID로 삭제
    static async deleteByBoardId({ boardId }) {
        const result = await models.Board.destroy({ where: { boardId } });
        const deletedResult = result.deletedCount == 1; //Boolean
        return deletedResult;
    }
    // userId로 삭제
    static async deleteByUserId({ userId }) {
        const result = await models.Board.destroy({ where: { userId } });
        return result;
    }

    // 검색?
}

export { boardModel };
