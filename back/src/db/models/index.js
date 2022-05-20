"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const { rds, local } = require("../config/config");
const db = {};

let sequelize = new Sequelize(rds.database, rds.user, rds.password, rds);

const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);
const Goal = require("./goal")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db["Post"] = Post;
db["Tag"] = Tag;
db["Goal"] = Goal;

// --------db sync drop----------

db.Post.sync();
db.Tag.sync();
db.Goal.sync();

// db.Post.drop();
// db.Tag.drop();
// db.Goal.drop();

module.exports = db;
