import express from "express"
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware";

const executionRouter = express.Router();

executionRouter.post("/", isUserValidAuthMiddleware, )

export default executionRouter;