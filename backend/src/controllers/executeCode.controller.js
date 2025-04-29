import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
    getJudge0LanguageId,
    submitBatch,
    pollBatchResults,
} from "../libs/judge0.lib.js";

const executeCode = asyncHandler(async (req, res) => {
    
});

export {
    executeCode,
}