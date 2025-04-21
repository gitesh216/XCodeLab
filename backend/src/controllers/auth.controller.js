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
        throw new ApiError(500, "Error in creating user", error)
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        if(!user){
            throw new ApiError(401, "User not found")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new ApiError(401, "Invalid credentials")
        }
        const token = jwt.sign(
            {
                id: user.id 
            },
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

        return res.status(200).json(
            new ApiResponse(200, {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.image
                }
            },
            "User logged in Successfully")
        );
    } 
    catch (error) {
        console.log("Error creating user: ", error);
        throw new ApiError(500, "Error in logging in", error)
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });

        return res.status(200).json(
            new ApiResponse(200, null, "Logout successfully")
        );
    } 
    catch (error) {
        console.log("Error in log out: ", error);
        throw new ApiError(500, "Error in logging out", error);        
    }
});

const getUser = asyncHandler(async (req, res) => {

});


export {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}


