import { tagModel } from "../db/models/tag/index";

class tagService {
  static async getPostListByTag({ tag }) {
    const postList = await tagModel.findPostsByTag({ tag });
    return postList;
  }
}
export { tagService };
