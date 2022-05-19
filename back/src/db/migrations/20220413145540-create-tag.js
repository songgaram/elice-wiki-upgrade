"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Tag", {
            tag_index: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tag_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            tag: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            post_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Tag");
    },
};
