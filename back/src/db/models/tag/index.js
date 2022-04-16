import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class tagModel {
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
    const postIdList = postId.postId.trim().split(" ");
    return postIdList;
  }

  static async insertPostId({ newPostTag }) {
    const insert = await models.Tag.create(newPostTag);
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

export { tagModel };
