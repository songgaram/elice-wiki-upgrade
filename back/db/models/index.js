"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db["Post"] = Post;
db["Tag"] = Tag;

// --------db sync drop----------

// Post.hasMany(Tag, {
//   foreignKey: "postId",
//   allowNull: false,
//   onDelete: "cascade",
// });
// Tag.belongsTo(Post, {
//   foreignKey: "postId",
// });

// db.Post.sync();
// db.Tag.sync();

// db.Post.drop();
// db.Tag.drop();

module.exports = db;