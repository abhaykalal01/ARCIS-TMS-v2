import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { getIO } from "../sockets/socket.js";

export const addcomment = async (req, res) => {
    try {
        const { taskId, text } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const project = await Project.findById(task.projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const isMember = project.members.some(
            (member) => member.toString() === req.user.id
        );

        if (!isMember && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Not allowed"
            });
        }

        const comment = await Comment.create({
            taskId,
            userId: req.user.id,
            text
        });

        await createNotification({
            userId: task.assignedTo, 
            message: "New comment on your task",
            type: "comment",
            taskId: task._id,
            createdBy: req.user.id
        });

        const populatedComment = await comment.populate("userId", "name email");

        const io = getIO();
        io.to(taskId).emit("new_comment", populatedComment);

        res.status(201).json({
            message: "Comment added successfully",
            comment: populatedComment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};