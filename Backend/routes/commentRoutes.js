import express from "express";
import { addcomment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, addcomment);

export default router
