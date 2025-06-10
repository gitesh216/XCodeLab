import express from "express"
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js"

const executionRouter = express.Router();

executionRouter.put("/", isUserValidAuthMiddleware, executeCode)

export default executionRouter;
