import Task from "../models/Task.js";
import { createNotification } from "./notificationController.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo } = req.body;
        const task = await Task.create({
            title,
            description,
            projectId,
            assignedTo,
            createdBy: req.user.id
        });
        await createNotification({
            userId: assignedTo,
            message: "You have been assigned a new task",
            type: "task_assigned",
            taskId: task._id,
            createdBy: req.user.id
        });
        res.status(201).json({
            message: "Task Created Successfully",
            task
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })

    }

}

export const getAllTasks = async (req, res) => {
    try {
        let task;

        if (req.user.role === "admin") {
            task = await Task.find().populate("assignedTo", "name email").populate("project", "name");
        }
        else {
            task = await Task.find({ assignedTo: req.user.id }).populate("project", "name");
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        task.status = status;
        await task.save();

        await createNotification({
            userId: task.assignedTo,
            message: `Task status updated to ${status}`,
            type: "status_changed",
            taskId: task._id,
            createdBy: req.user.id
        });

        res.json({
            message: "Task status updated successfully",
            task
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}
export const getkanbanTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find()
                .populate("assignedTo", "name")
                .populate("projectId", "name");
        }
        else {
            tasks = await Task.find({ assignedTo: req.user.id }).populate("projectId", "name");
        }

        const groupedTasks = {
            todo: [],
            "in-progress": [],
            done: []
        };

        tasks.forEach(task => {
            let status = task.status;

            if (status === "pending") status = "todo";
            if (status === "completed") status = "done";

            groupedTasks[status].push(task);
        });

        res.json(groupedTasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}