"use strict";
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    "Tag",
    {
      tag: { type: DataTypes.STRING, allowNull: false },
      postId: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Tag",
      freezeTableName: true,
    }
  );
  return tag;
};
