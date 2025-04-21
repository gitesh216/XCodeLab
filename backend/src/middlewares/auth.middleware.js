import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error";
import { db } from "../libs/db.js";

const isUserValidAuthMiddleware = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookie.token;
        if(!token){
            throw new ApiError(401, "Unauthorized - No token provided")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true
            }
        });
        if(!user){
            throw new ApiError(404, "User not found")
        }
        req.user = user;
        next()
    }
    catch(error){
        console.log("Error in auth middleware: ", error);
        throw new ApiError(500, "Error in catch of auth middleware", error)
    }
});


export {
    isUserValidAuthMiddleware,
}
