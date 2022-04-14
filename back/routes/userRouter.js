import { Router } from "express";
// import { loginRequired } from "../middlewares/loginRequired"
// import { adminRequired } from "../middlewares/adminRequired"

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);

// userRouter.use(loginRequired);
userRouter.get('/users', userController.getAllUsers);

export { userRouter };