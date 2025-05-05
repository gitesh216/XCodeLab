import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getAllSubmissions = asyncHandler(async(req, res) =>{
    const userId = req.user?.id;
    const submissions = await db.submission.findMany({
        where: {
            userId: userId
        }
    });

    return res.status(200).json(
        new ApiResponse(200, submissions, "Submissions fetched successfully")
    );
});

const getSubmissionForProblem = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const problemId = req.params.problemId;
    if(!problemId){
        new ApiError(400, "Problem id is required");
    }

    const submissions = await db.submission.findMany({
        where: {
            userId: userId,
            problemId: problemId
        }
    });
    return res.status(200).json(
        new ApiResponse(200, submissions, "Submissions fetched successfully")
    );
});

const getAllSubmissionsForProblem = asyncHandler(async(req, res) => {
    const problemId = req.params.problemId;
    if(!problemId){
        new ApiError(400, "Problem id is required");
    }
    const submissionCount = await db.submission.count({
        where: {
            problemId: problemId
        }
    });
    return res.status(200).json(
        new ApiResponse(200, {submissionCount}, "Submission count fetched successfully")
    )
});

export { 
    getAllSubmissions,
    getSubmissionForProblem,
    getAllSubmissionsForProblem
}
