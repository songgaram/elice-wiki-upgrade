"use strict";
// const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "Post",
    {
      postId: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      week: { type: DataTypes.INTEGER, allowNull: false },
      tag: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Post",
      freezeTableName: true,
    }
  );
  return post;
};

// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Post.init(
//     {
//       postId: DataTypes.STRING,
//       userId: DataTypes.STRING,
//       date: DataTypes.DATE,
//       week: DataTypes.INTEGER,
//       tag: DataTypes.STRING,
//       title: DataTypes.STRING,
//       body: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Post",
//       freezeTableName: true,
//     }
//   );
//   return Post;
// };
