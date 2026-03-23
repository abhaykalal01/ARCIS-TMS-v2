import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";  
import { initSocket } from "./sockets/socket.js";
import commentRoutes from "./routes/commentRoutes.js";
  
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors(
    {
        origin : "*"
    }
));
connectDB();
initSocket(server);

app.use(express.json());
app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/projects" , projectRoutes)
app.use("/api/tasks" , taskRoutes)
app.use("/api/comments", commentRoutes)

app.get("/", (req , res) => {
    res.send("Hello World")
})


const port = process.env.PORT || 5000;
server.listen(port , () => {
    console.log(`Server is running on port http://localhost:${port}`);
})