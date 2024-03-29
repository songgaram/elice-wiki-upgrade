import { tagModel } from "../db/models/tag/index";

class tagService {
    static async getPostListByTag({ tag }) {
        const postList = await tagModel.findPostsByTag({ tag });
        return postList;
    }

    static async getAllTag() {
        const tags = await tagModel.getAllTag();
        return tags;
    }

    static async deleteTag(postId) {
        await tagModel.deleteTag(postId);
    }
}
export { tagService };
