import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired"
import { adminRequired } from "../middlewares/adminRequired"

import { userController } from "../controller/userController.js";
const adminRouter = Router();

adminRouter.get('/users', userController.getAllUsers);
// adminRouter.get('/users', loginRequired, adminRequired, userController.getAllUsers);
adminRouter.delete("/users/:userId", loginRequired, adminRequired, userController.deleteUser);

export { adminRouter };