import { tagService } from "../services/tagService";

class tagController {
  // tag기반으로  postId를 검색하면 리스트 형태로 나옵니다.
  static async getAllPostId(req, res, next) {
    const tag = req.params.tag;
    const allPostId = await tagService.getAllPostbyTag({ tag });
    res.status(200).json(allPostId);
  }
}

export { tagController };
