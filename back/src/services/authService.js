import { authModel } from "../db/models/auth/auth";
import jwt from 'jsonwebtoken';


class authService {
  static async createQuestion({ question, answer }) {

    const newQuestion = { question, answer };
    const createdQuestion = await authModel.create({ newQuestion })

    return createdQuestion;
  }

  static async getCurrentQuestion() {

    const currentQuestion = await authModel.getLatestQuestion

    return currentQuestion;
  }

  static async findAll() {

    const users = await userModel.findAll();
    return users;
  }

}

export { authService };

//createQuestion, getCurrentQuestion, updateQuestion, deleteQuestion, findAll