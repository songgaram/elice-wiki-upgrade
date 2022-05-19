import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User API
 */

/**
 * @swagger
 * paths:
 *  /user/sign:
 *   post:
 *    tags: [User]
 *    summary: create new User
 *    requestBody:
 *      required: true
 *      content:
 *        application.json:
 *          schema:
 *            type: object
 *            properties:
 *              accessToken:
 *                  type: string
 *                  example: "ya29.a0ARrdaM8D9f31qE-bxSjjOy84qg9rGmYgPlM4TTmokf61_s7rhhnfvYZz7SLZksutwSieZBIBv8WLlLDkhKeS4--tgGS9D0oU2_xQjWsCjAOgUtFynn_h5cKOJRWSs5C1V0Su1mnLWFwUo8jkjjQlzMXYqwR6"
 *
 *    responses:
 *      200:
 *       description: 가입은 로그인과 같은 경로로 google oauth를 통해서만 이뤄지며, findOrCreate를 통해 db에 있으면 로그인, 없으면 가입 후 로그인 방식으로 진행된다.
 *       content:
 *         type: object
 *         properties:
 *          status:
 *              type: string
 *          payload:
 *              type: string
 */
userRouter.post("/user/auth", loginRequired, userController.auth);
userRouter.delete("/users/:userId", userController.deleteUser);
userRouter.get("/user/current", loginRequired, userController.getCurrentUser);

export { userRouter };
