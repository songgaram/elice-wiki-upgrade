import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired"
import { adminRequired } from "../middlewares/adminRequired"

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);
// userRouter.get('/users', loginRequired, adminRequired, userController.getAllUsers);
userRouter.post("/user/auth", loginRequired, userController.auth);

export { userRouter };