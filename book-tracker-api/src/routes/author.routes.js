import { Router } from "express";
import { findAuthor, findAuthors } from "../services/author.services.js";

const router = Router();

router.get("/authors", findAuthors);

router.get("/authors/:id", findAuthor);

export default router;