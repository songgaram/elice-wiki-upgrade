import { Router } from "express";

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);

export { userRouter };