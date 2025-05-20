import { Author } from "./Author.js";
import { Book } from "./Book.js";
import { User } from "./User.js";
import { Lecture } from "./Lecture.js";
import { Genre } from "./Genre.js";


// LECTURAS ==> LIBROS QUE EL USUARIO AGREGA A SU LISTA CON DETALLES PERSONALES (STATUS, RATING, ETC)

// Relaciones 1:N
// AUTORES TIENEN LIBROS
Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });

// EN CADA LECTURA, APARECE UN LIBRO
Book.hasMany(Lecture, { foreignKey: "bookId" });
Lecture.belongsTo(Book, { foreignKey: "bookId" });

// USUARIOS TIENEN LECTURAS
User.hasMany(Lecture, { foreignKey: "userId" });
Lecture.belongsTo(User, { foreingKey: "userId" });

// N:N
// LIBROS Y GENEROS
Book.belongsToMany(Genre, { through: "BookGenres", timestamps: false });
Genre.belongsToMany(Book, { through: "BookGenres", timestamps: false });

// AUTORES Y GENEROS
Author.belongsToMany(Genre, { through: "AuthorGenres", timestamps: false });
Genre.belongsToMany(Author, { through: "AuthorGenres", timestamps: false });


export { Author, Book, User, Lecture, Genre }