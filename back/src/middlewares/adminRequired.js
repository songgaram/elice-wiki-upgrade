import { userModel } from "../db/models/user/user";

async function adminRequired(req, res, next) {
  const { userId } = req.currentUser;
  const user = await userModel.findById({ userId })

  if (user.admin === 2) {
    console.log("admin2error")
    res.status(400).send("권한이 없는 유저입니다.");
    return
  }
  next()

}

export { adminRequired };
