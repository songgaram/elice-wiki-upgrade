"use strict";

/**
 * @swagger
 * components:
 *  schemas:
 *    Tag:
 *      type: object
 *      required:
 *          - tag_index
 *          - tag_id
 *          - tag
 *          - post_id
 *      properties:
 *          tag_index:
 *              type: string
 *          tag_id:
 *              type: string
 *          tag:
 *              type: string
 *          post_id:
 *              type: string
 */
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
