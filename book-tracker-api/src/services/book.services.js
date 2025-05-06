import { Book } from "../models/Book.js";

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
    const { title, authorId, pages, genre, summary, imageUrl } = req.body;

    if(!title || !authorId){
        return res.status(400).send({message: "Los libros requieren titulo y autor"});
    }

    const newBook = await Book.create({
        title, 
        authorId, 
        pages, 
        genre,
        summary, 
        imageUrl
    })

    res.json(newBook);
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, pages, genre, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    await Book.update({
        title, 
        authorId, 
        pages, 
        genre, 
        summary, 
        imageUrl
    },
        {
            where: {
                id
            }
        });

    res.json(book);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    
    await book.destroy();

    res.send(`El libro con id: ${id} ha sido destruido`);
}