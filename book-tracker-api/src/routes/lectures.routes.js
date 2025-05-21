import { Router } from "express";
import { createLecture, deleteLecture, findLectures, updateLecture } from "../services/lecture.services.js";
import { verifyToken } from "../services/auth.services.js";

const router = Router();

router.get("/my-books", verifyToken, findLectures);

// AÑADIR LIBRO A LISTA "Lectures"
router.post("/my-books", verifyToken, createLecture);

router.put("/my-books/:id", verifyToken, updateLecture);

router.delete("/my-books/:id", verifyToken, deleteLecture);

export default router;