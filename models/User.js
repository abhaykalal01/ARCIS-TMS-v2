
import moongoose from "mongoose";
const UserSchema  = new moongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "employees"],
        default: "employees"
    }
},{
    timestamps: true
});

const User = moongoose.model("User", UserSchema);

export default User