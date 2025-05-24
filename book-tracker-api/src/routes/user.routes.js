import { Router } from "express";
import { verifyToken } from "../services/auth.services.js";
import { getUser, updateUser } from '../services/user.services.js'

const router = Router();

router.get("/profile/:id", verifyToken, getUser);

router.put("/profile/:id", verifyToken, updateUser);

export default router;