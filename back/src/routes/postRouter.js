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
 *   post:
 *    tags: [Post]
 *    summary: create new post
 *    requestBody:
 *      description: creat new post
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *       description: 새 게시글 생성 성공!!
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.post("/newpost", postController.addPost);

/**
 * @swagger
 * paths:
 *  /post/id/{id}:
 *   get:
 *      tags: [Post]
 *      summary: find post by post_id
 *      parameters:
 *          - name: id
 *            in: path
 *            type: string
 *            description: post_id
 *      responses:
 *          200:
 *           description: succ
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                          payload:
 *                              $ref: '#/components/schemas/Post'
 *
 */

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
 *        description: tag 정보
 *    responses:
 *      200:
 *       description: succ
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 *
 */
postRouter.get("/post/tag/:tag", postController.getPostsByTag);

/**
 * @swagger
 * paths:
 *  /post/week/{week}:
 *   get:
 *      tags: [Post]
 *      summary: find posts by week
 *      parameters:
 *          - name: week
 *            in: path
 *            type: string
 *            description: week 정보
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.get("/post/week/:week", postController.getPostByWeek);

/**
 * @swagger
 * paths:
 *  /post/update/:id:
 *    put:
 *      tags: [Post]
 *      summary: update post info
 *      parameters:
 *          - name: id
 *            in: path
 *            type: string
 *            description: post의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.put("/post/update/:id", postController.updatePost);

/**
 * @swagger
 * paths:
 *  /posts:
 *    get:
 *      tags: [Post]
 *      summary: find all post
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 *
 */
postRouter.get("/posts", postController.findAllPost);

export { postRouter };
