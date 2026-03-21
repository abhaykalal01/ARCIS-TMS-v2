import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";    
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/projects" , projectRoutes)
app.use("/api/tasks" , taskRoutes)

app.get("/", (req , res) => {
    res.send("Hello World")
})


const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`Server is running on port http://localhost:${port}`);
})