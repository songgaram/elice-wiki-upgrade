import { postService } from "../services/postService";

class postController {
  static async addPost(req, res, next) {
    try {
      // 요청으로부터 데이터 받아오기
      const { userId, week, tag, title } = req.body;
      // body에 text가 저장되어 올 것
      // TODO: 텍스트를 어떻게 받아와야 잘 저장이 될지 고민..
      // 아래 방법으로는 md파일에 저장해도 제대로 보여주지 못함
      // front에서 바로 md파일을 만들 수 있는지 찾아보기, 백에서도 동일하게
      const body = `#title 
      ## h2 
      -p tag`;

      const newPost = await postService.addPost({
        userId,
        week,
        tag,
        body,
        title,
      });
      res.status(201).json(body).end();
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
