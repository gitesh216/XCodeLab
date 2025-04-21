import express from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from "../controllers/auth.controller.js"
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware.js"

const authRouter = express.Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.post("/logout", isUserValidAuthMiddleware, logoutUser)

authRouter.get("/check", isUserValidAuthMiddleware, getUser)

export default authRouter;