"use strict";
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    "Tag",
    {
      tag_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
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
