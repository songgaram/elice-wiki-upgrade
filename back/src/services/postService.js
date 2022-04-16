import { postModel } from "../db/models/post/post";
import { tagModel } from "../db/models/tag/index";

import { v4 as uuidv4 } from "uuid";
import fs from "fs";

class postService {
  // 값 req에서 받아와 추가 하기
  // tag 여러개 가져오는 방법은 프론트와 함께 얘기해봐야 함 #tag 이런식??
  static writePost(date, postId, body) {
    const savePath_post = "../../../front/src/_post";
    const savePath = `${__dirname}`;
    // postId는 라우팅 경로로 사용될 수 있으므로 shortId로 만드는 것도 괜찮을 듯

    // front/src/_post에 md파일이 저장된다
    fs.writeFile(
      `${savePath}/${savePath_post}/${date}-${postId}.md`,
      "\ufeff" + body,
      {
        encoding: "utf-8",
      },
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  static getNowDateToString() {
    // 현재 시간을 받아오기
    const nowDate = new Date();
    const year = nowDate.getUTCFullYear();

    // 월과 일은 2자리가 아닌경우 앞에 0을 붙여줌
    const month =
      nowDate.getUTCMonth().toString().length !== 2
        ? `0${nowDate.getUTCMonth()}`
        : nowDate.getUTCMonth();

    const day =
      nowDate.getUTCDate().toString().length !== 2
        ? `0${nowDate.getUTCDate()}`
        : nowDate.getUTCDate();

    const date = `${year}-${month}-${day}`;

    const dateDot = `${year}.${month}.${day}`;
    return { date, dateDot };
  }

  static async addPost({ user_id, week, tag, title, body }) {
    // body에서 받은 text를 md파일로 저장
    // TODO: const savePath = '../../front/post' -> 저장하게될 예상 경로

    const { date, dateDot } = this.getNowDateToString();
    const post_id = uuidv4();
    this.writePost(date, post_id, body);

    // tag 테이블에 추가하기
    let storedTag = "";

    tag.forEach(async (tag) => {
      const tag_id = uuidv4();
      storedTag += `#${tag}`;

      const newPostTag = { tag_id, tag, post_id };
      const insertPostIdInTag = await tagModel.insertPostId({ newPostTag });
    });

    const newPost = {
      post_id,
      user_id,
      date: dateDot,
      week,
      tag: storedTag,
      title,
    };
    const insertedPost = await postModel
      .insertPost({ newPost })
      .then(() => console.log("post created"))
      .catch((err) => console.log(err));

    return insertedPost;
  }

  static async getPostByPostId({ postId }) {
    const getOnePost = await postModel.getPostByPostId({ postId });
    const tagList = getOnePost.tag.replaceAll("#", " ").trim().split(" ");
    const postInfo = {
      title: getOnePost.title,
      date: getOnePost.date,
      week: getOnePost.week,
      tags: tagList,
      userId: getOnePost.userId,
    };
    return postInfo;
  }
}

export { postService };
