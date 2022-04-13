import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class tag {
  static async getAllTag({ tag }) {
    const postId = await models.Tag.findOne({ where: { tag: tag } });
    return postId;
  }

  static async insertPostId({ tag, postId }) {
    const insert = await models.Tag.create({ tag, postId });
    return insert;
  }

  static async update({ tag, postId }) {
    const update = await models.Tag.update(
      { postId: postId },
      { where: { tag: tag } }
    );
    return update;
  }
}

export { tag };
