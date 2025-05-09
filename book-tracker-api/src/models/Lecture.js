import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js"
import { Book } from "./Book.js"

export const Lecture = sequelize.define("lecture", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: "id"
        // }
    },
    // COMENTAR bookId PARA PROBAR RELACION USER LECTURE
    // COMENTAR userId PARA PROBAR RELACION BOOK LECTURE
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Book,
        //     key: "id"
        // }
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    pageCount: {
        type: DataTypes.INTEGER,
    },
    dateStarted: {
        type: DataTypes.DATE,
    },
    dateFinished: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM("Leyendo", "Para leer", "Leído"),
    }
}, {
    timestamps: false
})