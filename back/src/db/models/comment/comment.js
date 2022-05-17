import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class commentModel {
  static async insertComment({ newComment }) {
    const insertedComment = await models.Comment.create(newComment);
    return insertedComment;
  }

  static async findByCommentId({ commentId }) {
    const comment = await models.Comment.findOne({ where: { commentId } });
    return comment;
  }

  static async findByBoardId({ boardId }) {
    const commentList = await models.Comment.findAll({
      order: [
        ["groupId", "ASC"],
        ["order", "ASC"],
      ],
      where: { boardId },
    });
    return commentList;
  }

  static async findByDepth({ groupId, parentCommentId, depth }) {
    const comments = await models.Comment.findAll({
      where: { groupId, parentCommentId, depth },
    });
    return comments;
  }

  static async incrementOrder({ groupId, orderRange }) {
    const comments = await models.Comment.increment(
      { order: 1 },
      { where: { groupId, order: { [Op.gte]: orderRange } } }
    );
    return comments;
  }

  static async update({ commentId, fieldToUpdate, newValue }) {
    const filter = { commentId };
    const update = { [fieldToUpdate]: newValue };
    const updatedComment = await models.Comment.update(update, {
      where: filter,
    });

    return updatedComment;
  }

  static async deleteByCommentId({ commentId }) {
    const result = await models.Comment.destroy({ where: { commentId } });
    const deletedResult = result === 1;
    return deletedResult;
  }
}

export { commentModel };
