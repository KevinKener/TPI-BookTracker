import { Router } from "express";
import { createLecture, deleteLecture, findLectures, updateLecture } from "../services/lecture.services";

const router = Router();

router.get("/lectures", findLectures);

// ??? No sé si va acá, lo puse en books
// router.post("/lectures", createLecture);

router.put("/lectures/:id", updateLecture);

router.delete("/lectures/:id", deleteLecture);

export default router;