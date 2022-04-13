import models, { Sequelize } from "../index";
import { tag } from "../tag/index";

const Op = Sequelize.Op;

class postModel {
  // post 추가
  static async insertPost({ newPost }) {
    const insertPost = await models.Post.create(newPost);

    const tags = await tag.getAllTag({ tag: "python" });

    if (tags === null) {
      const insertPostId = await tag.insertPostId({
        tag: "python",
        postId: newPost.postId,
      });
    } else {
      // update tag table
      let oldValue = tags.postId;
      oldValue += ` ${newPost.postId}`;
      const update = await tag.update({ tag: "python", postId: oldValue });
      console.log(update);
    }

    return insertPost;
  }
  // update된 python의 postId 리스트이다
  // fa663522-1b79-4fcd-8334-4f91f649b74b dd21e2da-0836-45f4-a200-a3e57340673f

  // 입력 받은 tag를 포함하는 post를 찾으려고 함
  // 여러가지 쿼리 조합해서 사용하면 될것 같음
  // 내부적으로 view 테이블을 만들어 두는 방법이 가능할지 찾아보기
  // timezome이 저장될 때 한국 시간으로 저장이 안됨..-> 안되면 시간 표시할 때 +09:00을 해주는 방법 사용
  // TODO: timezone 해결 하기
  static async findByTag(tag) {
    console.log(`get tag is ${tag}`);
    const findPostByTag = await models.Post.findAll({
      where: {
        tag: {
          // tag가 문자열로 '#blah #blah #blah' 에서 tag를 포함하면 반환
          [Op.substring]: `${tag}`, // %react%
        },
      },
    });
    console.log(findPostByTag);
    return findPostByTag;
  }
}

export { postModel };
