import { Router } from "express";
import { findGenres } from "../services/genre.services.js";

const router = Router();

router.get("/genres", findGenres);

export default router;