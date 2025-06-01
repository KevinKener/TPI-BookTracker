import { Router } from "express";
import { createBook, deleteBook, findBook, findBooks, findPopularBooks, updateBook } from "../services/book.services.js";

const router = Router();

router.get("/books", findBooks);

router.get("/books/:id", findBook);

router.get("/popularbooks", findPopularBooks);

router.post("/books", createBook);

router.put("/books/:id", updateBook);

router.delete("/books/:id", deleteBook);

export default router;