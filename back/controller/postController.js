import { postService } from "../services/postService";

class postController {
  static async addPost(req, res, next) {
    try {
      // 요청으로부터 데이터 받아오기
      const { userId, date, week, tag, title, body } = req.body;
      const newPost = await postService.addPost({
        userId,
        date,
        week,
        tag,
        title,
        body,
      });
      res.status(201).json(newPost).end();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getPostByTag(req, res, next) {
    try {
      const tag = req.params.tag;
      const posts = await postService.findPostByTag(tag);
      res.status(200).json(posts);
    } catch (error) {
      console.log(error.message);
    }
  }
}
export { postController };
