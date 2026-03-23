import Notification from "../models/Notification.js";
import { getIO } from "../sockets/socket.js";

export const createNotification = async ({
    userId,
    message,
    type,
    taskId,
    createdBy
}) => {
    try {
        const notification = await Notification.create({
            userId,
            message,
            type,
            taskId,
            createdBy
        });

        const io = getIO();

        io.to(userId.toString()).emit("new_notification", notification);

        return notification;

    } catch (error) {
        console.log("Notification error:", error);
    }
};