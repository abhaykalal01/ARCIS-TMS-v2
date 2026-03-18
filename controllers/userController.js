import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createEmployee = async (req , res) => {
    try {
        const {name  , email , password} = req.body;

        const userexists = await User.findOne({email});

        if(userexists){
            return res.status(400).json({
                message : "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10);

        const employee = await User.create({
            name,
            email,
            password : hashedPassword,
            role : "employees"
        })

        res.status(201).json({
            message : "Employee Created Successfully",
            employee
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong",
            error
        })
    }
}