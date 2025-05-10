import { Book } from "../models/index.js";
import { Genre } from "../models/index.js";

export const findBooks = async (req, res) => {
    const books = await Book.findAll();

    res.json(books);
}

export const findBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id);

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
    for (const id of genres){
        const [genre] = await Genre.findAll({ 
            where: { 
                id 
            } 
        });
        // LOS AGREGA A LA LISTA INICIALIZADA
        genreInstances.push(genre);
    }

    // ASOCIA LOS GENEROS AL LIBRO
    await newBook.addGenres(genreInstances);

    res.json(newBook);
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, pages, genres, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    await Book.update({
        title, 
        authorId, 
        pages, 
        summary, 
        imageUrl
    },
        {
            where: {
                id
            }
        });

    const genreInstances = await Genre.findAll({ 
        where: { 
            id: genres 
        } 
    })

    await book.setGenres([]);

    await book.addGenres(genreInstances);

    const updatedGenres = await book.getGenres();

    res.json({
        // toJSON es como .json pero evita la filtración de datos innecesarios
        //  ...book.toJSON(),
        // Mapea SÓLO el nombre del género
        genres: updatedGenres.map(genre => genre.name)
    });
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    
    await book.destroy();

    res.send(`El libro con id: ${id} ha sido destruido`);
}