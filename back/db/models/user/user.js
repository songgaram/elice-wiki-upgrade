import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class userModel {
  static async create({ newUser }) {

    const createdUser = await models.User.create(newUser)
      .then(() => console.log("A new user signed up now"))
      .catch((err) => console.log(err.message));
    return createdUser;
  }

  static async findByEmail({ email }) {
    try
    {const user = await models.User.findOne({ where: {email: email} })
    return user;}
    catch (err) {console.log(err.message)}
  }
  
}

export { userModel };