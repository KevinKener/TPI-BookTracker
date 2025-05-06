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
        allowNull: true,
    },
    genres: {
        type: DataTypes.ENUM('fantasy', 'fiction', 'romance', 'horror', 'romance', 'mystery'),
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        timestamps: false,
    }
)