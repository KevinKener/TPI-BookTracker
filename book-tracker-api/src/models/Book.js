import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Book = sequelize.define("book", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pages: {
        type: DataTypes.INTEGER,
    },
    genre: {
        type: DataTypes.STRING,
    },
    summary: {
        type: DataTypes.STRING,
    },
    imageUrl: DataTypes.STRING,
}, {
    timestamps: false,
})