import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class authModel {
    static async create(data) {
        const createdQuestion = await models.Auth.create(data);
        return createdQuestion;
    }
    static async delete({ id }) {
        const result = await models.Auth.destroy({ where: { id: id } });
        return result;
    }
    static async findAndUpdate({ id, fieldToUpdate }) {
        if (fieldToUpdate.current) {
            await models.Auth.update({ current: false }, { where: { current: true } });
        }
        try {
            await models.Auth.update(fieldToUpdate, { where: { id: id } });
            const result = await models.Auth.findOne({ where: { id: id } });
            return result;
        } catch (err) {
            console.log(err.message);
        }
    }
    static async getQuestion({ id }) {
        if (!id) {
            const result = await models.Auth.findOne({
                where: { current: true },
            });
            return result;
        }
        const result = await models.Auth.findOne({
            where: { id: id },
        });
        return result;
    }
    static async findAll({ page, perPage }) {
        if (parseInt(page) >= 1 && parseInt(perPage) >= 1) {
            const pageNum = parseInt(page);
            const prPage = parseInt(perPage);
            const offset = prPage * (pageNum - 1);
            try {
                const result = await models.Auth.findAndCountAll({ limit: prPage, offset: offset });
                return result;
            } catch (err) {
                console.log(err.message);
            }
        } else {
            try {
                const result = await models.Auth.findAll();
                return result;
            } catch (err) {
                console.log(err.message);
            }
        }
    }
}

export { authModel };
