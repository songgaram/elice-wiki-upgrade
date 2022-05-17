import { authModel } from "../db/models/auth/auth";
import jwt from 'jsonwebtoken';


class authService {
  static async createQuestion({ question, answer }) {

    const newQuestion = { question, answer };
    const createdQuestion = await authModel.create({ newQuestion })

    return createdQuestion;
  }

  static async getQuestion({ id }) {

    const result = await authModel.getQuestion({ id });

    return result;
  }

  static async findAll() {

    const users = await userModel.findAll();
    return users;
  }

}

export { authService };

//createQuestion, getCurrentQuestion, updateQuestion, deleteQuestion, findAll