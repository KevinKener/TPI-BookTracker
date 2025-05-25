import { Router } from "express";
import { verifyToken } from "../services/auth.services.js";
import { deleteUser, getUser, updateUser } from '../services/user.services.js'

const router = Router();

router.get("/profile/:id", verifyToken, getUser);

router.put("/profile/:id", verifyToken, updateUser);

router.delete("/profile/:id", verifyToken, deleteUser);

export default router;