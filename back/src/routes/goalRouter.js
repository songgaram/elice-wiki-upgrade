import { Router } from "express";
import { goalController } from "../controller/goalController";

const goalRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Goal
 *  description: Goal API
 */

/**
 * @swagger
 * paths:
 *  /insert/goal:
 *    post:
 *      tags: [Goal]
 *      summary: insert data
 *      requestBody:
 *        description: insert goal data
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Goal'
 *      responses:
 *        200:
 *          description: 목표 입력 성공
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          type: string
 *
 */
goalRouter.post("/insert/goal", goalController.insert);

/**
 * @swagger
 * paths:
 *  /goals:
 *   get:
 *      tags: [Goal]
 *      summary: find all goal
 *      responses:
 *          200:
 *           description: succ
 *           content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          items:
 *                            $ref: '#/components/schemas/Goal'
 */
goalRouter.get("/goals", goalController.findAllGoal);

/**
 * @swagger
 * paths:
 *  /goal/week/{week}:
 *   get:
 *      tags: [Goal]
 *      summary: find goal by week
 *      parameters:
 *          - name: week
 *            in: path
 *            type: string
 *            description: 특정 주차의 목표를 입력
 *      responses:
 *          200:
 *           description: succ(반환값으로 goal 3개는 배열로 반환됨)
 *           content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Goal'
 */
goalRouter.get("/goal/week/:week", goalController.findGoalByWeek);
export { goalRouter };
