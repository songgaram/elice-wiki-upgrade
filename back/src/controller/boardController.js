import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";
import { headerError } from "../utils/errorMessages";

class boardController {
    static async addBoard(req, res, next) {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(headerError);
            }
            // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
            //   const userId = req.currentUserId;
            // req (request) 에서 데이터 가져오기
            const { userId, postId, title, body } = req.body;

            const newBoard = await boardService.addBoard({
                userId,
                postId,
                title,
                body,
            });

            res.status(201).end();
        } catch (error) {
            next(error);
        }
    }

    static async getBoard(req, res, next) {
        try {
            const { boardId } = req.params;
            const foundBoard = await boardService.getBoard({ boardId });

            res.status(200).send(foundBoard);
        } catch (error) {
            next(error);
        }
    }

    static async getBoardList(req, res, next) {
        try {
            const { userId } = req.params;
            const foundList = await boardService.getBoardList({ userId });

            res.status(200).send(foundList);
        } catch (error) {
            next(error);
        }
    }

    static async setBoard(req, res, next) {
        try {
            const { boardId } = req.params;
            const postId = req.body.postId ?? null;
            const title = req.body.title ?? null;
            const body = req.body.body ?? null;

            const toUpdate = { postId, title, body };

            const updatedBoard = await boardService.setBoard({
                boardId,
                toUpdate,
            });

            res.status(200).json(updatedBoard);
        } catch (error) {
            next(error);
        }
    }

    static async deleteBoard(req, res, next) {
        try {
            const { boardId } = req.params;
            const deletedResult = await boardService.deleteBoard({ boardId });

            res.status(200).end();
        } catch (error) {
            next(error);
        }
    }
}
export { boardController };
