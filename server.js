import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./Config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)

app.get("/", (req , res) => {
    res.send("Hello World")
})

const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`Server is running on port http://localhost:${port}`);
})