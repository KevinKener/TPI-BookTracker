import { Router } from "express";
import { verifyToken } from "../services/auth.services.js";
import { deleteUser, getUser, getUsers, updateUser } from '../services/user.services.js'

const router = Router();

// USUARIOS COMUNES
router.get("/profile/:id", verifyToken, getUser);

router.put("/profile/:id", verifyToken, updateUser);

router.delete("/profile/:id", verifyToken, deleteUser);

// PROFILE SETTINGS
router.put("/profile-settings/:id", verifyToken, updateUser);

router.delete("/profile-settings/:id", verifyToken, deleteUser);

// ADMINS / MODS
router.get("/admin-users", verifyToken, getUsers);

router.put("/admin-users/:id", verifyToken, updateUser);

router.delete("/admin-users/:id", verifyToken, deleteUser);



export default router;