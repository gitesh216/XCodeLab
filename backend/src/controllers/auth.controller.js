import bcrypt from "bcryptjs"
import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from "../utils/api-response.js"
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/prisma/index.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })   
        if(existingUser){
            throw new ApiError(400, "User already existe")
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })
        const token = jwt.sign({
            id: newUser.id }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "developement",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        };
        res.cookie("token", token, cookieOptions);

        return res.status(201).json(
            new ApiResponse(201, {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                    image: newUser.image
                }
            },
            "User created Successfully")
        );
    }
    catch (error) {
        console.log("Error creating user: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error creating user")
        );
    }
});

const loginUser = asyncHandler(async (req, res) => {

});

const logoutUser = asyncHandler(async (req, res) => {

});

const getUser = asyncHandler(async (req, res) => {

});


export {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}


