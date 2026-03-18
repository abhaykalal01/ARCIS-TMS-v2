import jwt from "jsonwebtoken";

export const protect = (req , res , next) => {
try {
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message : "Not authorized"
        })
    }
    token = token.split(" ")[1];
    
} catch (error) {
    
}
}