import { Router } from "express";
import { Book } from "../models/Book.js";

const router = Router();

router.get("/books", async (req, res) => {
    const books = await Book.findAll();

    res.json(books);
});

router.get("/books/:id", async (req, res) => {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    res.json(book);

});

router.post("/books", async (req, res) => {
    const { title, authorId, pages, genre, summary, imageUrl } = req.body;

    if(!title || !authorId){
        return res.status(400).send({message: "Los libros requieren titulo y autor"});
    }

    const book = await Book.create({
        title, 
        authorId, 
        pages, 
        genre,
        summary, 
        imageUrl
    })

    res.json(book);
});

router.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, authorId, pages, genre, summary, imageUrl } = req.body;

    const book = await Book.findByPk(id);

    if(!book){
        return res.status(400).send({message: "No se ha encontrado el libro"});
    }

    

});

router.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    res.send(`Eliminando libro con id: ${id}`);
});
export default router;