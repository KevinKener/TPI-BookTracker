import { DataTypes } from "sequelize";
import { sequelize } from "../db";

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
    genres: {
        type: DataTypes.ENUM,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
},
    {
        timestamps: false,
    }
)