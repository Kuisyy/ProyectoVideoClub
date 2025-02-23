import { Router } from "express";
import { login, register, checkAuth } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", authenticateToken,checkAuth);

export default router;
