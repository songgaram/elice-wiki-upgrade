import { authModel } from "../db/models/auth/auth";

class authService {
  static async createQuestion(data) {
    const createdQuestion = await authModel.create(data);
    return createdQuestion;
  }

  static async getQuestion({ id }) {

    const result = await authModel.getQuestion({ id });

    return result;
  }

  static async updateQuestion(data) {
    const { id, fieldToUpdate } = data;
    const result = await authModel.findAndUpdate({ id, fieldToUpdate });

    return result;
  }

  static async deleteQuestion({ id }) {

    const result = await authModel.delete({ id });

    return result;
  }

  static async findAll() {

    const questions = await authModel.findAll();
    return questions;
  }

}

export { authService };

//createQuestion, getCurrentQuestion, updateQuestion, deleteQuestion, findAll