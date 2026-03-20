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

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
} catch (error) {
    res.status(401).json({
        message : "Not authorized"
    })
}
}

export const isAdmin = (req , res , next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message : "Admin access required"
        })
    
    }
    next();
};