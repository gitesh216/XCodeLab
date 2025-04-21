import express from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from "../controllers/auth.controller.js"

const authRouter = express.Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.post("/logout", logoutUser)

authRouter.post("/check", getUser)

export default authRouter;