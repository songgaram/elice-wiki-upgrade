import jwt from "jsonwebtoken";

function adminRequired(req, res, next) {
  // loginRequired를 거쳤으므로 token은 반드시 있음.
  const userToken = req.headers["authorization"]?.split(" ")[1]

  try {
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const { user_id, admin, authorized }= jwtDecoded
    req.currentUserId = user_id;
    if ( admin == 2 ) {
        res.status(400).send("권한이 없는 유저입니다.");
        return
    }
    next();
  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

export { adminRequired };
