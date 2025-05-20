import { Router } from "express";
import { createLecture, deleteLecture, findLectures, updateLecture } from "../services/lecture.services";

const router = Router();

router.get("/my-books", findLectures);

// ??? No sé si va acá, lo puse en books
// router.post("/my-books", createLecture);

router.put("/my-books/:id", updateLecture);

router.delete("/my-books/:id", deleteLecture);

export default router;