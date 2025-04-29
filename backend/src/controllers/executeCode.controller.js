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
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;

    const userId = req.user.id;
    if(!userId){
        throw new ApiError(400, "User id not found");
    }

    if(
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length !== stdin.length
    ){
        return res.status(400).json(
            new ApiResponse(400, null, "Invalid or missing test cases")
        );
    }

    // prepare each test cases for Judge0 batch submission
    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input,
    }));

    // send batch of submissions to Judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // Poll Judge0 for results of all submitted test cases
    const results = await pollBatchResults(tokens);

    console.log("Results-----------------------------");
    console.log(results);
    
});

export {
    executeCode,
}