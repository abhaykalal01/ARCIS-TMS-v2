import express from "express";
const router = express.Router();
import { createProject } from "../controllers/projectController.js";

router.post("/" , createProject);

export default router