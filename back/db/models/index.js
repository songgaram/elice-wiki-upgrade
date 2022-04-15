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

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

const Post = require("./post")(sequelize, Sequelize.DataTypes);
const Tag = require("./tag")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Post 테이블이 없는 경우 생성 해준다.
// db.Post.drop()으로 테이블 삭제 가능

// --------db sync drop----------

// Post(sequelize, Sequelize.DataTypes).sync();
// Tag(sequelize, Sequelize.DataTypes).sync();

// TODO: 외래키 지정해보기 - 성공

Post.hasMany(Tag, {
  foreignKey: "postId",
  allowNull: false,
  onDelete: "cascade",
});
Tag.belongsTo(Post, {
  foreignKey: "postId",
});

Post.sync();
Tag.sync();

// db.Post.sync();
// db.Tag.sync();

// db.Post.drop();
// db.Tag.drop();

module.exports = db;
