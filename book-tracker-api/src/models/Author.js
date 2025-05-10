import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Author = sequelize.define("author", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthplace: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    summary: {
        type: DataTypes.STRING,
    }
},
    {
        timestamps: false,
    }
)