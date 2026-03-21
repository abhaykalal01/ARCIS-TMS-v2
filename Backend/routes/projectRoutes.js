import express from "express";
import { createProject , getAllProject } from "../controllers/projectController.js";
import { protect , isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/" , protect , isAdmin , createProject);
router.get("/" , protect , getAllProject);

export default router