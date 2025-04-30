import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
    getJudge0LanguageId,
    submitBatch,
    pollBatchResults,
} from "../libs/judge0.lib.js";
import axios from "axios"

const createProblem = asyncHandler(async (req, res) => {
    // 1. get all the data from request body
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippet,
        referenceSolution,
    } = req.body;

    // 2. (optional) check user admin or not once again
    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to create a problem");
    }

    // 3. loop through each reference solution in the database with the corresponding solution
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        // 3.1 get judge0 submission id for the current language
        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
            throw new ApiError(400, `${language} is not supported`);
        }

        // 3.2 prepare judge0 submission for all the testcases
        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
        }));

        // 3.3 submit all the test cases in one batch
        const submissionResults = await submitBatch(submissions);

        // 3.4  extract tokens from reponse
        const tokens = submissionResults.map((res) => res.token);

        // 3.5 poll judge0 untill all submissions are done
        const results = await pollBatchResults(tokens);

        // 3.6 validate that each test cases passed (status.id === 3)
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Results------------------------------------", result);
            if (result.status.id !== 3) {
                throw new ApiError(
                    400,
                    `Testcase ${i + 1} failed for language ${language}`,
                );
            }
        }
    }
    // 4. save the problem in the database after all validations pass
    const newProblem = await db.problem.create({
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippet,
            referenceSolution,
            userId: req.user.id
        },
    });
    return res.status(201).json(
        new ApiResponse(201, newProblem, "Problem created successfully")
    )
});

const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await db.problem.findMany();

    if(!problems){
        throw new ApiError(404, "Problems not found");
    }

    res.status(200).json(
        new ApiResponse(200, problems, "Problems fetched successfully")
    );
});

const getProblemById = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    });
    if(!problem){
        throw new ApiError(404, "Problem not found by id")
    }
    return res.status(200).json(
        new ApiResponse(200, problem, "Problem fetched sucessfully by id")
    );
});

const updateProblem = asyncHandler(async (req, res) => {
    const problemId = req.params;
    
    if(!problemId){
        throw new ApiError(400, "Required problem id not found");
    }

    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to update a problem");
    }

    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    });

    if(!problem){
        throw new ApiError(400, "Problem not found with the given id");
    }
    // baaki kaam same hai as create
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippet,
        referenceSolution,
    } = req.body;

    const userId = req.user.id;

    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        
        const languageId = getJudge0LanguageId(language);

        if (!languageId) {
            throw new ApiError(400, `${language} is not supported`);
        }

        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output,
        }));

        const submissionResults = await submitBatch(submissions);

        const tokens = submissionResults.map((res) => res.token);

        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            console.log("Results------------------------------------", result);
            if (result.status.id !== 3) {
                throw new ApiError(
                    400,
                    `Testcase ${i + 1} failed for language ${language}`,
                );
            }
        }
    }
    // 4. save the problem in the database after all validations pass
    const newProblem = await db.problem.update({
        where: {
            id: problemId
        },
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippet,
            referenceSolution,
            userId
        },
    });
    return res.status(201).json(
        new ApiResponse(201, newProblem, "Problem created successfully")
    );
});

const deleteProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    if(!problemId){
        throw new ApiError(400, "Problem Id not found while deleting the problem");
    }
    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    });
    if(!problem){
        throw new ApiError(404, "Problem not found with the given id");
    }
    await db.problem.delete({
        where: {
            id: problemId
        }
    });
    return res.status(200).json(
        new ApiResponse(200, null, "Problem deleted successfully")
    );
});

const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {});

export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getAllProblemsSolvedByUser,
};
