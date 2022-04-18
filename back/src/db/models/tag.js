"use strict";
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    "Tag",
    {
      tag_index: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tag_id: { type: DataTypes.STRING, allowNull: false },
      tag: { type: DataTypes.STRING, allowNull: false },
      post_id: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Tag",
      freezeTableName: true,
    }
  );
  return tag;
};
