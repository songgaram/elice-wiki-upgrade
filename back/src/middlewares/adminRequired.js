function adminRequired(req, res, next) {
  try {
    const { admin } = req.currentUser;
    
    if (admin === 2) {
      console.log("admin2error")
      res.status(400).send("권한이 없는 유저입니다.");
      return
    }
    next()

  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

export { adminRequired };
