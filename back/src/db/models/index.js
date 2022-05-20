"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const { ssh, local } = require("../config/config");
const db = {};

let sequelize = new Sequelize(ssh.database, ssh.user, ssh.password, ssh);

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
