import moongoose from "mongoose";

const TaskSchema = new moongoose.Schema({
    title: {
        type : String,
        required: true
    },
    description : {
        type: String,
    },
    projectId : {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedTo : {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy : {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status : {
        type : String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    }
})

const Task= moongoose.model("Task", TaskSchema);

export default Task