import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class userModel {
  static async create({ newUser }) {

    const createdUser = await models.Users.create(newUser)
      .then(() => console.log("A new user signed up now"))
      .catch((err) => console.log(err.message));
    return createdUser;
  }

  static async findByEmail({ email }) {
    try {
      const user = await models.Users.findOne({ where: { email: email } })
      return user;
    }
    catch (err) { console.log(err.message) }
  }

  static async findById({ userId }) {
    try {
      const user = await models.Users.findOne({ where: { __id: userId } })
      return user;
    }
    catch (err) { console.log(err.message) }
  }

  static async findAndUpdate({ userId, fieldToUpdate }) {
    try {
      await models.Users.update(fieldToUpdate, { where: { __id: userId } })
      const user = await models.Users.findOne({ where: { __id: userId } })
      return user;
    }
    catch (err) { console.log(err.message) }
  }

  static async findAll() {
    try {
      const user = await models.Users.findAll()
      return user;
    }
    catch (err) { console.log(err.message) }
  }

  static async delete({ userId }) {
    try {
      const result = await models.Users.destroy({ where: { __id: userId } })
      return result;
    }
    catch (err) {
      console.log(err.message)
    }
  }

}

export { userModel };