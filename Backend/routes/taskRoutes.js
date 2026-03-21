import express from "express";
import { createTask  , getAllTasks, updateTaskStatus } from "../controllers/taskController.js";
import { protect , isAdmin} from "../middleware/authMiddleware.js";

 
const router = express.Router();

router.post("/" , protect , isAdmin  , createTask);
router.get("/" , protect , getAllTasks);
router.put("/:id/status" , protect , updateTaskStatus )

export default router



