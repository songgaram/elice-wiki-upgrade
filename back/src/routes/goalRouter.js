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
