import { Router } from "express";
import { deleteLecture, findLectures, updateLecture } from "../services/lecture.services.js";
import { verifyToken } from "../services/auth.services.js";

const router = Router();

router.get("/my-books", verifyToken, findLectures);

router.put("/my-books/:id", verifyToken, updateLecture);

router.delete("/my-books/:id", verifyToken, deleteLecture);

export default router;