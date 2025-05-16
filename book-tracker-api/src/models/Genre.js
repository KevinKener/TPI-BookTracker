import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Genre = sequelize.define("genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})