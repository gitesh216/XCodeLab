import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
    getJudge0LanguageId,
    submitBatch,
    pollBatchResults,
} from "../libs/judge0.lib.js";

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
            if (result.status.id !== 3) {
                throw new ApiError(
                    400,
                    `Testcase ${i + 1} failed for language ${language}`,
                );
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
    }

    // 3.2 prepare judge0 submission for all the testcases

    // 3.3 submit all the test cases in one batch

    // 3.4  extract tokens from reponse

    // 3.5 poll judge0 untill all submissions are done

    // 3.6 validate that each test cases passed (status.id === 3)

    // 4. save the problem in the database after all validations pass
});

const getAllProblems = asyncHandler(async (req, res) => {});

const getProblemById = asyncHandler(async (req, res) => {});

const updateProblem = asyncHandler(async (req, res) => {});

const deleteProblem = asyncHandler(async (req, res) => {});

const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {});

export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getAllProblemsSolvedByUser,
};
