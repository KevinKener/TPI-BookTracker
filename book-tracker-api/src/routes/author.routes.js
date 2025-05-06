import { Router } from "express";
import { createAuthor, deleteAuthor, findAuthor, findAuthors, updateAuthor } from "../services/author.services.js";

const router = Router();

router.get("/authors", findAuthors);

router.get("/authors/:id", findAuthor);

router.post("/authors", createAuthor);

router.put("/authors/:id", updateAuthor);

router.delete("/authors/:id", deleteAuthor);

export default router;