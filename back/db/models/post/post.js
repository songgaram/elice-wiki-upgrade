import models from "../index";

class postModel {
  static async insertPost({ newPost }) {
    const insertPost = await models.Post.create(newPost)
      .then(() => console.log("post is created"))
      .catch((err) => console.log(err.message));
    return insertPost;
  }
}

export { postModel };
