import { Router } from "express";
import { 
    isUserValidAuthMiddleware,
    checkAdmin 
} from "../middlewares/auth.middleware.js"

import {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getAllProblemsSolvedByUser,
} from "../controllers/problem.controller.js"

const problemRouter = Router();

problemRouter.post("/create-problem", isUserValidAuthMiddleware, checkAdmin, createProblem)

problemRouter.get("/get-all-problems", isUserValidAuthMiddleware, getAllProblems)

problemRouter.get("/get-problem/:id", isUserValidAuthMiddleware, getProblemById)

problemRouter.put("/update-problem/:id", isUserValidAuthMiddleware, checkAdmin, updateProblem)

problemRouter.delete("/delete-problem/:id", isUserValidAuthMiddleware, checkAdmin, deleteProblem)

problemRouter.get("/get-solved-problems", isUserValidAuthMiddleware, getAllProblemsSolvedByUser)

export default problemRouter;