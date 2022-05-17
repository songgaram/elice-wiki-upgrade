"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      groupId: DataTypes.INTEGER,
      parentCommentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: DataTypes.INTEGER,
      depth: DataTypes.INTEGER,
      boardId: DataTypes.STRING,
      userId: DataTypes.STRING,
      content: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
