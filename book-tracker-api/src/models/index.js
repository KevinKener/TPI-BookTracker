import { Author } from "./Author.js";
import { Book } from "./Book.js";
import { User } from "./User.js";
import { Lecture } from "./Lecture.js";
import { Genre } from "./Genre.js";


// Relaciones 1:N
// AUTORES TIENEN LIBROS
Author.hasMany(Book, {foreignKey: "authorId"});
Book.belongsTo(Author, {foreignKey: "authorId"});

// USUARIOS TIENEN LISTAS
User.hasOne(Lecture, {foreignKey: "userId"});
Lecture.belongsTo(User, {foreignKey: "userId"});

// LIBROS PUEDEN ESTAR EN VARIAS LISTAS
Lecture.belongsToMany(Book, { through: "LectureBook", timestamps: false });
Book.belongsToMany(Lecture, { through: "LectureBook", timestamps: false });

// N:N
// LIBROS Y GENEROS
Book.belongsToMany(Genre, { through: "BookGenres", timestamps: false });
Genre.belongsToMany(Book, { through: "BookGenres", timestamps: false });

// AUTORES Y GENEROS
Author.belongsToMany(Genre, { through: "AuthorGenres", timestamps: false });
Genre.belongsToMany(Author, { through: "AuthorGenres", timestamps: false });


export { Author, Book, User, Lecture, Genre }