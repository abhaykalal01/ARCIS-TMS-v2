import moongoose from "mongoose";

const connectDB = async () => {
    try {
        await moongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("DB Connection Error", error);
        process.exit(1);
        
    }
}

export default connectDB;