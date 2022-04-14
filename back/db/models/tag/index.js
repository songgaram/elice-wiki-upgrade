import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class tag {
  // 찾은 태그가 없으면 자동으로 생성, 있으면 찾기와 같은 동작
  static async findOrCreate({ tag }) {
    const findTag = await models.Tag.findOrCreate({
      where: { tag: tag },
      defaults: { postId: null },
    }).then(([idString, created]) => idString.get({ plain: true }));
    return findTag;
  }

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
