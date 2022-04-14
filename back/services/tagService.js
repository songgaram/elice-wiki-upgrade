import { tagModel } from "../db/models/tag/index";

class tagService {
  static async getAllPostbyTag({ tag }) {
    const allPostId = await tagModel.getAllTag({ tag });
    return allPostId;
  }
}
export { tagService };
