import express from "express"
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware.js";
import { 
    executeCode, 
    executeRunCodeTestcases 
} from "../controllers/executeCode.controller.js"

const executionRouter = express.Router();

executionRouter.put("/submit-code", isUserValidAuthMiddleware, executeCode)

executionRouter.post("/run-code", isUserValidAuthMiddleware, executeRunCodeTestcases);

export default executionRouter;
