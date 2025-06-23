import express from "express";
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware.js";
import {
    getAllSubmissions,
    getSubmissionForProblem,
    getAllSubmissionsForProblem
} from "../controllers/submission.controller.js"

const submissionRouter = express.Router();

submissionRouter.get("/get-all-submissions", isUserValidAuthMiddleware, getAllSubmissions)

submissionRouter.get("/get-submission/:problemId", isUserValidAuthMiddleware, getSubmissionForProblem)

submissionRouter.get("/get-submissions-count/:problemId", isUserValidAuthMiddleware, getAllSubmissionsForProblem);

export default submissionRouter;