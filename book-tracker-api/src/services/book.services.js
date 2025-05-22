import { Author, Book } from "../models/index.js";
import { Genre } from "../models/index.js";

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

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    res.json(book);

}

export const createBook = async (req, res) => {
    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    if(!title || !authorId){
        return res.status(400).send({message: "Los libros requieren titulo y autor"});
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
    
    // BUSCAR GENEROS POR ID
    if (Array.isArray(genres)){

        for (const id of genres){
            const genre = await Genre.findByPk(id);
            // LOS AGREGA A LA LISTA INICIALIZADA
            genreInstances.push(genre);
        }
        
        // ASOCIA LOS GENEROS AL LIBRO
        await newBook.addGenres(genreInstances);
    }

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

export const updateBook = async (req, res) => {
    // PARA MODIFICACIONES CON POSTMAN
    // const { id } = req.params;
    // const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    const { id, title, authorId, pages, genres, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({ message: "No se ha encontrado el libro" });
    }

    await book.update({
        title, 
        authorId, 
        pages, 
        summary, 
        imageUrl
    });

    if (Array.isArray(genres)){

        const genreInstances = [];
        
        for (const genreId of genres){
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

export const deleteBook = async (req, res) => {
    const { id } = req.body;
    const book = await Book.findByPk(id);
    
    await book.destroy();

    res.send(`El libro con id: ${id} ha sido destruido`);
}