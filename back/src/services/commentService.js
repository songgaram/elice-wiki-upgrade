import { commentModel } from "../db/models/comment/comment";
import { v4 as uuidv4 } from "uuid";
import { addError, findError } from "../utils/errorMessages";

class commentService {
  static async addComment({ userId, boardId, content }) {
    if (!userId || !boardId || !content) {
      const errorMessage = addError("댓글");
      throw new Error(errorMessage);
    }
    const commentId = uuidv4();
    const newComment = { commentId, userId, boardId, content };
    const insertedComment = await commentModel.insertComment({ newComment });

    return insertedComment;
  }

  static async getComment({ commentId }) {
    const comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("댓글");
      throw new Error(errorMessage);
    }
    return comment;
  }

  static async getCommentList({ boardId }) {
    const commentList = await commentModel.findByBoardId({ boardId });
    return commentList;
  }

  static async setComment({ commentId, toUpdate }) {
    let comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      comment = await commentModel.update({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    return comment;
  }

  static async deleteComment({ commentId }) {
    const deletedResult = await commentModel.deleteByCommentId({ commentId });
    if (!deletedResult) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    return deletedResult;
  }
}

export { commentService };
