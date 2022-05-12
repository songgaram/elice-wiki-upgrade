function adminRequired(req, res, next) {
  const { admin } = req.currentUser;

  if (admin === 2) {
    console.log("admin2error")
    res.status(400).send("권한이 없는 유저입니다.");
    return
  }
  next()

}

export { adminRequired };
