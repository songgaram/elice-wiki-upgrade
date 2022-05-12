import { userService } from "../services/userService";
import { authService } from "../services/authService";
import axios from 'axios';

class userController {
  static async sign(req, res, next) {
    try {
      const { accessToken } = req.body;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
      );
      const user = await userService.findOrCreate({ data });
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await userService.findAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async auth(req, res, next) {
    try {
      const { userId } = req.currentUser;
      const { answer } = req.body;
      const currentQuestion = await authService.getCurrentQuestion();
      if (currentQuestion?.answer == answer) {
        const result = await userService.authUser({ userId });
        return res.status(200).json({ result });
      }
      const result = { success: false }
      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
}
export { userController };