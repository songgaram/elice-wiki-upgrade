import { userService } from "../services/userService";
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
      const { userId } = req.params;
      const users = await userService.authUser({ userId });
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }
}
export { userController };