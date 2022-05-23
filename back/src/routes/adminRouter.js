import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { adminRequired } from "../middlewares/adminRequired";

import { userController } from "../controller/userController.js";
import { postController } from "../controller/postController.js";
const adminRouter = Router();

adminRouter.get("/users", userController.getAllUsers);
adminRouter.delete("/users/:userId", userController.deleteUser);
adminRouter.put("/users/:userId", userController.updateUser);
adminRouter.delete("/posts/:postId", postController.deletePost);
// adminRouter.get('/users', loginRequired, adminRequired, userController.getAllUsers);
// adminRouter.delete("/users/:userId", loginRequired, adminRequired, userController.deleteUser);

export { adminRouter };
