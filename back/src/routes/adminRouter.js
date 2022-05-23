import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { adminRequired } from "../middlewares/adminRequired";

import { userController } from "../controller/userController.js";
import { postController } from "../controller/postController.js";
const adminRouter = Router();

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      tags: [User]
 *      summary: find all user
 *      parameters:
 *          - name: page
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *          - name: perPage
 *            in: query
 *            required: false
 *            schema:
 *              type: string
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
 *                          items:
 *                              $ref: '#/components/schemas/Users'
 *
 */
adminRouter.get("/users", loginRequired, adminRequired, userController.getAllUsers);

/**
 * @swagger
 * paths:
 *  /users/:userId:
 *   delete:
 *    tags: [User]
 *    summary: delete User by userId
 *    parameters:
 *          - name: userId
 *            in: parameters
 *            required: true
 *            description: |
 *              - 1개 이상의 유저아이디의 배열을 **","**로 join한 문자열 입력
 *              - String joined from userIdList by **","**
 *            example: 1e040ba7-2569-4640-92ad-2eebf2a364e7**,**c7e09153-edf5-418c-b578-81ae3f3bb024
 *            schema:
 *              type: string
 *    responses:
 *      200:
 *        description: succ
 *        content:
 *          application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: integer
 *                                  failed:
 *                                      type: integer
 *
 */
adminRouter.delete("/users/:userId", loginRequired, adminRequired, userController.deleteUser);
adminRouter.put("/users/:userId", loginRequired, adminRequired, userController.updateUser);
adminRouter.delete("/posts/:postId", loginRequired, adminRequired, postController.deletePost);

export { adminRouter };
