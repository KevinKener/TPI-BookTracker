import { Router } from "express";
import { createBook, deleteBook, findBook, findBooks, updateBook } from "../services/book.services.js";
import { createLecture } from "../services/lecture.services.js";

const router = Router();

router.get("/books", findBooks);

router.get("/books/:id", findBook);

router.post("/books", createBook);

router.put("/books/:id", updateBook);

router.delete("/books/:id", deleteBook);

// AÑADIR LIBRO A LISTA "Lectures"
router.post("/books/:id", createLecture);

export default router;