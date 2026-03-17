import moongoose from "mongoose";
const ProjectSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type : String
    },
    createBy : {
        type: moongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members : [
        {
            type: moongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{
    timestamps: true
});

const Project = moongoose.model("Project", ProjectSchema);

export default Project