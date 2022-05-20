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
    sequelize = new Sequelize(process.env[config.use_env_variable], config, {
        logging: console.log,
    });
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
        { logging: console.log }
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const Users = require("./user")(sequelize, Sequelize.DataTypes);
const Auth = require("./auth")(sequelize, Sequelize.DataTypes);
const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);
const Goal = require("./goal")(sequelize, Sequelize.DataTypes);
const Boards = require("./board")(sequelize, Sequelize.DataTypes);
const Comments = require("./comment")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db["Users"] = Users;
db["Auth"] = Auth;
db["Post"] = Post;
db["Tag"] = Tag;
db["Goal"] = Goal;
db["Boards"] = Boards;
db["Comments"] = Comments;

// --------db sync drop----------

db.Post.sync();
db.Tag.sync();
db.Users.sync();
db.Goal.sync();
db.Boards.sync();
db.Comments.sync();

// db.Post.drop();
// db.Tag.drop();
// db.Goal.drop();
// db.Boards.drop();
// db.Comments.drop();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
