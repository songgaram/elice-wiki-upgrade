import { Router } from "express";
import { tagController } from "../controller/tagController";

const tagRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Tag
 *  description: Tag
 */

tagRouter.get("/tag/:tag", tagController.getAllPostByTag);

/**
 * @swagger
 * paths:
 *  /tags:
 *   get:
 *    tags: [Tag]
 *    summary: get all tags
 *    responses:
 *     200:
 *      description: 모든 태그 가져오기
 *      content:
 *        type: object
 *        properties:
 *            status:
 *                type: string
 *            payload:
 *                type: object
 */
tagRouter.get("/tags", tagController.getAllTag);

export { tagRouter };
