import Project from "../models/Project.js";

export const createProject = async (req , res) => {
    try {
        const {name , description} = req.body;

        const project = await Project.create({
            name,
            description,
            createBy : req.user.id
        });

        res.status(201).json({
            message : "Project Created Successfully",
            project
        });
    
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Server Error"
        });
    }
}

export const getAllProject = async (req , res) => {
    try {
        const projects = await Project.find();

        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message : "Server Error"
        })
    }
};