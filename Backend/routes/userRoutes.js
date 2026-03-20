import express from "express";
const router = express.Router();
import { createEmployee } from "../controllers/userController.js";
import { isAdmin , protect } from "../middleware/authMiddleware.js"

router.post("/" , protect , isAdmin , createEmployee);

export default router