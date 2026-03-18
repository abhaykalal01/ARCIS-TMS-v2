import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Abhay2919", 10);

    const admin = await User.create({
      name: "Abhay",
      email: "abhay29@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin Created Successfully");
    console.log(admin);

    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();