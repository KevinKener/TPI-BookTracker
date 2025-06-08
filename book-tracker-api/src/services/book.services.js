import { validateAuthor, validateGenre, validatePages, validateSummary, validateTitle } from "../helpers/validations.books.js";
import { Author, Book, Lecture } from "../models/index.js"; // Asegúrate de que 'Lecture' esté correctamente importado aquí
import { Genre } from "../models/index.js";
import { Sequelize } from 'sequelize'; // Importa Sequelize para las funciones de agregación

// validaciones
const validateNewBook = (req) => {
    const { title, authorId, pages, genres, summary } = req.body;

    if (!title || !validateTitle(title, 50, 1))
        return { error: true, message: "El título debe tener entre 1 y 50 caracteres." };

    if (!authorId || !validateAuthor(authorId))
        return { error: true, message: "Debes elegir un autor válido." };

    if (!pages || !validatePages(pages, 6000, 1))
        return { error: true, message: "El libro debe tener entre 1 y 6000 páginas." };

    if (!validateGenre(genres))
        return { error: true, message: "Debes seleccionar al menos un género." };

    if (!summary || !validateSummary(summary, 1000))
        return { error: true, message: "El resumen debe tener hasta 1000 caracteres." };

    return { error: false };
};



// Función para encontrar todos los libros
export const findBooks = async (req, res) => {
    const books = await Book.findAll({
        include: [
            {
                model: Author,
                attributes: ['authorName']
            },
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });

    res.json(books);
}

// Función para encontrar un libro por ID
export const findBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id, {
        include: [
            {
                model: Author,
                attributes: ['authorName']
            },
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });

    if (!book) {
        return res.status(400).send({ message: "No se ha encontrado el libro" });
    }

    res.json(book);
}

// Función para crear un nuevo libro
export const createBook = async (req, res) => {

    // validaciones
    const result = validateNewBook(req);

    if (result.error) {
        return res.status(400).send({ message: result.message });
    }

    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    // busca por si hay algun libro con ese título 
    const book = await Book.findOne({
        where: {
            title
        }
    });

    if (book) {
        return res.status(400).send({ message: "El libro ya se encuentra registrado" })
    }

    const newBook = await Book.create({
        title,
        authorId,
        pages,
        summary,
        imageUrl
    })

    // INICIALIZAR ARRAY DE GENEROS VACIO
    const genreInstances = [];
    for (const id of genres) {
        const genre = await Genre.findByPk(id);
        if (!genre) {
            return res.status(400).send({ message: `Género con ID ${id} no encontrado.` });
        }
        genreInstances.push(genre);
    }
    await newBook.addGenres(genreInstances);

    const createdBook = await Book.findByPk(newBook.id, {
        include: [
            {
                model: Author,
                attributes: ['authorName']
            },
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    })

    res.json(createdBook);
}

// Función para actualizar un libro existente
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
        return res.status(400).send({ message: "No se ha encontrado el libro" });
    }

    await book.update({
        title,
        authorId,
        pages,
        summary,
        imageUrl
    });

    if (Array.isArray(genres)) {

        const genreInstances = [];

        for (const genreId of genres) {
            const genre = await Genre.findByPk(genreId);

            if (genre) {
                // LOS AGREGA A LA LISTA INICIALIZADA
                genreInstances.push(genre);
            }

        }

        // REEMPLAZA LOS GENEROS VIEJOS POR LOS NUEVOS
        await book.setGenres(genreInstances);
    }

    const updatedBook = await Book.findByPk(id, {
        include: [
            {
                model: Author,
                attributes: ['authorName']
            },
            {
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });

    res.json(updatedBook);
}

// Función para eliminar un libro
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    await book.destroy();

    res.send(`El libro con id: ${id} ha sido destruido`);
}


// FUNCIÓN PARA OBTENER LOS LIBROS POPULARES
export const findPopularBooks = async (req, res) => {
    try {
        // Contar las apariciones de cada bookId en la tabla Lectures y obtener los 10 principales
        const popularBookCounts = await Lecture.findAll({
            attributes: [
                'bookId',
                // Cuenta las ocurrencias de bookId y le da el alias 'count'
                [Sequelize.fn('COUNT', Sequelize.col('bookId')), 'count']
            ],
            // Agrupa los resultados por bookId
            group: ['bookId'],
            limit: 10
        });

        // Extraer solo los bookIds de los resultados de la consulta
        const popularBookIds = popularBookCounts.map(item => item.bookId);

        // Si no se encontraron libros populares, devolver un array vacío
        if (popularBookIds.length === 0) {
            return res.json([]);
        }

        // Obtener los detalles completos de los libros populares seleccionados
        const booksDetails = await Book.findAll({
            where: {
                id: popularBookIds
            },
            include: [
                {
                    model: Author,
                    attributes: ['authorName']
                },
                {
                    model: Genre,
                    attributes: ['name'],
                    through: { attributes: [] }
                }
            ]

        });

        res.json(booksDetails);

    } catch (error) {
        console.error("Error fetching popular books:", error);
        res.status(500).send({ message: "Error al obtener los libros populares", error: error.message });
    }
};