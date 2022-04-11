import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class postModel {
  // post 추가
  static async insertPost({ newPost }) {
    const insertPost = await models.Post.create(newPost)
      .then(() => console.log("post is created"))
      .catch((err) => console.log(err.message));
    return insertPost;
  }

  // 입력 받은 tag를 포함하는 post를 찾으려고 함
  // 여러가지 쿼리 조합해서 사용하면 될것 같음
  // 내부적으로 view 테이블을 만들어 두는 방법이 가능할지 찾아보기
  static async findByTag(tag) {
    // *오류 발생 함 : value.map is not a function
    const findPostByTag = await models.Post.findAll({
      where: {
        tag: {
          // tag 들 중 포함되는 post를 가져오려고 함
          [Op.in]: `${tag}`,
        },
      },
    })
      .then(() => console.log("search by tag succ"))
      .catch((err) => console.log(err));
    return findPostByTag;
  }
}

export { postModel };
