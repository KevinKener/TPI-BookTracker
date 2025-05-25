import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePictureUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM('admin', 'mod', 'reader'),
        // POR DEFECTO, los usuarios registrados son "Lectores"
        defaultValue: 'reader'
    }
}, {
    timestamps: true
})