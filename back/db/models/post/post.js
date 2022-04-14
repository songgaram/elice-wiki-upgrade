import models, { Sequelize } from "../index";
import { tag } from "../tag/index";

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
      const getTag = await tag.findOrCreate({ tag: ele });
      let oldValue = getTag.postId;
      oldValue += ` ${newPost.postId}`;
      oldValue = oldValue.replace("undefined", "");
      const update = await tag.update({ tag: ele, postId: oldValue });
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
  // update된 python의 postId 리스트이다
  // fa663522-1b79-4fcd-8334-4f91f649b74b dd21e2da-0836-45f4-a200-a3e57340673f

  // timezome이 저장될 때 한국 시간으로 저장이 안됨..-> 안되면 시간 표시할 때 +09:00을 해주는 방법 사용
  // TODO: timezone 해결 하기
  // ** 해당 태그를 달고 있는 post의 id는 tag에서 처리 가능
  static async findByTag(tag) {
    const findPostByTag = await models.Post.findAll({
      where: {
        tag: {
          // tag가 문자열로 '#blah #blah #blah' 에서 tag를 포함하면 반환
          [Op.substring]: `${tag}`, // %react%
        },
      },
    });
    return findPostByTag;
  }
}

export { postModel };
