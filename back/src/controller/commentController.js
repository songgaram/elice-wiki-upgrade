import is from "@sindresorhus/is";
import { commentService } from "../services/commentService";
import { headerError } from "../utils/errorMessages";

class commentController {
  static async addComment(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(headerError);
      }
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      //   const userId = req.currentUserId;
      // req (request) 에서 데이터 가져오기
      const { userId, boardId, content } = req.body;

      await commentService.addComment({
        userId,
        boardId,
        content,
      });

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }

  static async getComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const foundComment = await commentService.getComment({ commentId });

      res.status(200).send(foundComment);
    } catch (error) {
      next(error);
    }
  }

  static async getCommentList(req, res, next) {
    try {
      const { boardId } = req.params;
      const foundList = await commentService.getCommentList({ boardId });

      res.status(200).send(foundList);
    } catch (error) {
      next(error);
    }
  }

  static async setComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const content = req.body.content ?? null;

      const toUpdate = { content };

      const updatedComment = await commentService.setComment({
        commentId,
        toUpdate,
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      await commentService.deleteComment({ commentId });

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
export { commentController };
