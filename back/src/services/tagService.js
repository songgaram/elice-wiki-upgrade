import { tagModel } from "../db/models/tag/index";
import { postModel } from "../db/models/post/post";

class tagService {
  static async getAllPostbyTag({ tag }) {
    const postIdName = [];
    const allPostId = await tagModel.getAllTag({ tag });

    // tag로 검색할 때 post의 제목도 같이 가져온다
    await Promise.all(
      allPostId.map(async (ele) => {
        const getPostInfo = await postModel.getPostByPostId({ postId: ele });
        postIdName.push({ title: getPostInfo.title, postid: ele });
      })
    );

    return postIdName;
  }
}
export { tagService };
