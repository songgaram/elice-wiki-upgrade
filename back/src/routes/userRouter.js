import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired"

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);
userRouter.post("/user/auth", loginRequired, userController.auth);
userRouter.delete("/user", loginRequired, userController.deleteUser);

export { userRouter };