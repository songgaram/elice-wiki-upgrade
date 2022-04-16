import models, { Sequelize } from "../index";
import { tagModel } from "../tag/index";

const Op = Sequelize.Op;

class postModel {
  // post 추가
  static async insertPost({ newPost }) {
    const insertPost = await models.Post.create(newPost);

    return insertPost;
  }

  static async getPostByPostId({ postId }) {
    // postId로 post의 정보검색
    // 사용자가 post를 눌렀을 때 동작?
    const getOnePost = await models.Post.findOne({ where: { postId } });
    return getOnePost;
  }

  // static async updatePost({})
}

export { postModel };
