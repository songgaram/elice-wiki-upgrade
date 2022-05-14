import { Router } from "express";
import { postController } from "../controller/postController";

const postRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post API
 */

/**
 * @swagger
 * paths:
 *  /newpost:
 *   get:
 *    tags: [Post]
 *    summary: create new post
 *    requestBody:
 *      required: true
 *      content:
 *        application.json:
 *          schema:
 *            type: object
 *            properties:
 *              post_id:
 *                  type: string
 *              user_id:
 *                  type: string
 *              date:
 *                  type: string
 *
 *    responses:
 *      200:
 *       description: 새 게시글 생성 성공!!
 *       content:
 *         type: object
 *         properties:
 *          status:
 *              type: string
 *          payload:
 *              type: string
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
 * @swagger
 * paths:
 *  /posts:
 *    get:
 *      tags: [Post]
 *      summary: find all post
 *      responses:
 *          200:
 *           description: succ
 *           content:
 *              application/json:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      paload:
 *                          type: object
 *
 */
postRouter.get("/posts", postController.findAllPost);

export { postRouter };
