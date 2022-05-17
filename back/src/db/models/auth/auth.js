import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class authModel {
    static async create({ newQuestion }) {
        const createdAuth = await models.Auth.create(newQuestion)
        return createdAuth;
    }
    static async getQuestion({ id }) {
        if (!id) {
            const result = await models.Auth.findOne({
                where: { current: true },
            })
            return result;
        }
        const result = await models.Auth.findOne({
            where: { id: id },
        })
        return result;

    }
}

export { authModel };