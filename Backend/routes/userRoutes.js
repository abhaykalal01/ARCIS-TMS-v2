import express from "express";
const router = express.Router();
import { createEmployee } from "../controllers/userController.js";

router.post("/" , createEmployee);

export default router