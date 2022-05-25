"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const { rds, local } = require("../config/config");
const db = {};

<<<<<<< HEAD
=======
// let sequelize = new Sequelize(
//     local.database,
//     local.user,
//     local.password,
//     local
// );
>>>>>>> 31df96958a778348275bc5b1c2dc52630e61e509
let sequelize = new Sequelize(rds.database, rds.user, rds.password, rds);

const Users = require("./user")(sequelize, Sequelize.DataTypes);
const Auth = require("./auth")(sequelize, Sequelize.DataTypes);
const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);
const Goal = require("./goal")(sequelize, Sequelize.DataTypes);
const Board = require("./board")(sequelize, Sequelize.DataTypes);
const Comment = require("./comment")(sequelize, Sequelize.DataTypes);

db["Users"] = Users;
db["Auth"] = Auth;
db["Post"] = Post;
db["Tag"] = Tag;
db["Goal"] = Goal;
db["Board"] = Board;
db["Comment"] = Comment;

// --------db sync drop----------

db.Post.sync();
db.Tag.sync();
db.Users.sync();
db.Goal.sync();
db.Board.sync();
db.Comment.sync();
db.Auth.sync();

// db.Post.drop();
// db.Tag.drop();
// db.Goal.drop();
// db.Board.drop();
// db.Comment.drop();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
