import { Router } from "express";
import { postController } from "../controller/postController";

const postRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post API
 */

postRouter.post("/newpost", postController.addPost);

// findByPostId
postRouter.get("/post/id/:id", postController.getPostByPostId);

/**
 * @swagger
 * paths:
 *  /post/tag/{tag}:
 *   get:
 *    tags: [Post]
 *    summary: Post API
 *    parameters:
 *      - name: tag
 *        in: path
 *        type: string
 *        description: week 정보
 *    responses:
 *      200:
 *       description: succ
 *       content:
 *          application/json:
 *              schema:
//  *               $ref: '#/components/schemas/Post'
 *
 */
postRouter.get("/post/tag/:tag", postController.getPostsByTag);
// week로 post 검색
postRouter.get("/post/week/:week", postController.getPostByWeek);

// id = post id
postRouter.put("/post/update/:id", postController.updatePost);

/**
//  * @swagger
 *  components:
 *   schemas:
 *      Post:
 *       type: object
 *       properties:
 *          post_id:
 *           type: string
 *
 */
export { postRouter };
