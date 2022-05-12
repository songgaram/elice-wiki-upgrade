import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class authModel {
    static async create({ newQuestion }) {
        const createdAuth = await models.Auth.create(newQuestion)
        return createdAuth;
    }
    static async getLatestQuestion() {
        const latestQuestion = await models.Auth.findOne({
            order: [['createdAt', 'DESC']],
        })
        return latestQuestion;
    }
}

export { authModel };