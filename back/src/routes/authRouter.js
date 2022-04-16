import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired"
import { adminRequired } from "../middlewares/adminRequired"

import { authController } from "../controller/authController.js";
const authRouter = Router();

authRouter.use(loginRequired);
authRouter.use(adminRequired);

//인증 질문을 새로 만든뒤 만들어진 새 질문을 현재 질문으로 설정
authRouter.post("/auth", authController.newQuestion)

//현재 인증 질문, 답변을 반환
authRouter.get("/auth", authController.getCurrentQuestion);

//현재 인증 질문, 답변을 수정
authRouter.put("/auth", authController.updateCurrentQuestion);

//현재 인증 질문, 답변을 삭제하고 바로 이전 질문, 답변을 현재 질문으로 설정
authRouter.delete("/auth", authController.deleteCurrentQuestion);

//인증 질문, 답변들 변경 이력을 반환
authRouter.get("/auths", authController.getQuestions);

export { authRouter };