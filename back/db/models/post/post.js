import models, { Sequelize } from "../index";
import { tagModel } from "../tag/index";

const Op = Sequelize.Op;

class postModel {
  // post 추가
  static async insertPost({ newPost }) {
    const tagList = [...newPost.tag];
    let storedTag = "";

    tagList.forEach(async (ele) => {
      // 저장될 태그를 #이 붙은 문자열로 합친다
      storedTag += `#${ele}`;

      // tag 테이블에 저장하기, 테이블에 존재하지 않으면 생성(findOrCreate)
      const getTag = await tagModel.findOrCreate({ tag: ele });
      let oldValue = getTag.postId;
      oldValue += ` ${newPost.postId}`;
      oldValue = oldValue.replace("null", "");
      const update = await tagModel.update({ tag: ele, postId: oldValue });
    });

    const insertPost = await models.Post.create({
      postId: newPost.postId,
      userId: newPost.userId,
      date: newPost.date,
      week: newPost.week,
      tag: storedTag,
      title: newPost.title,
    });

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
