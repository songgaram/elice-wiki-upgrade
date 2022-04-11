import { postModel } from "../db/models/post/post";
import { v4 as uuidv4 } from "uuid";

class postService {
  // 값 req에서 받아와 추가 하기
  // tag 여러개 가져오는 방법은 프론트와 함께 얘기해봐야 함 #tag 이런식??
  // date는 createdAt을 사용해도 괜찮지 않을까..
  static async addPost({ userId, date, week, tag, title, body }) {
    const postId = uuidv4();

    const newPost = { postId, userId, date, week, tag, title, body };
    const insertedPost = await postModel
      .insertPost({ newPost })
      .then(() => console.log("post created"))
      .catch((err) => console.log(err));

    return insertedPost;
  }

  static async findPostByTag(tag) {
    const getPosts = await postModel.findByTag(tag);
    return getPosts;
  }
}

export { postService };
