import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
    getJudge0LanguageId,
    getLanguageName,
    submitBatch,
    pollBatchResults,
} from "../libs/judge0.lib.js";
import { SubmissionStatus } from "../generated/prisma/index.js";

const executeCode = asyncHandler(async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
        req.body;

    const userId = req.user.id;
    if (!userId) {
        throw new ApiError(400, "User id not found");
    }

    if (
        !Array.isArray(stdin) ||
        stdin.length === 0 ||
        !Array.isArray(expected_outputs) ||
        expected_outputs.length !== stdin.length
    ) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Invalid or missing test cases"));
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

    // Analyse test case results
    let allTestCasesPassed = true;
    const detailedTestCasesResults = results.map((result, i) => {
        const stdout = result.stdout?.trim();
        const expected_output = expected_outputs[i]?.trim();
        const passed = stdout === expected_output;

        console.log(`Testcase #${i + 1}`);
        console.log(`Input: ${stdin[i]}`);
        console.log(`Expected Output for testcase:  ${expected_output}`);
        console.log(`Actual output ${stdout}`);
        console.log(`IsMatched: ${passed}`);

        if (!passed) allTestCasesPassed = false;

        return {
            testCase: i + 1,
            passed,
            stdout,
            expected: expected_output,
            stderr: result.stderr || null,
            compile_output: result.compile_output || null,
            status: result.status.description,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} s` : undefined,
        };
    });
    console.log(detailedTestCasesResults);

    // store submission summary
    const submission = await db.submission.create({
        data: {
            userId,
            problemId,
            sourceCode: source_code,
            language: getLanguageName(language_id),
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(
                detailedTestCasesResults.map((r) => r.stdout),
            ),
            stderr: detailedTestCasesResults.some((r) => r.stderr)
                ? JSON.stringify(detailedTestCasesResults.map((r) => r.stderr))
                : null,
            compileOutput: detailedTestCasesResults.some(
                (r) => r.compile_output,
            )
                ? JSON.stringify(
                      detailedTestCasesResults.map((r) => r.compile_output),
                  )
                : null,
            status: allPassed
                ? SubmissionStatus.ACCEPTED
                : SubmissionStatus.WRONG_ANSWER,
            memory: detailedTestCasesResults.some((r) => r.memory)
                ? JSON.stringify(detailedTestCasesResults.map((r) => r.memory))
                : null,
            time: detailedTestCasesResults.some((r) => r.time)
                ? JSON.stringify(detailedTestCasesResults.map((r) => r.time))
                : null,
        },
    });

    // If all passed = true mark problem as solved for the current user
    if(allTestCasesPassed){
        await db.problemSolved.upsert({
            where: {
                userId_problemId: {
                    userId, 
                    problemId
                }
            },
            update: {},
            create: {
                userId, 
                problemId
            }
        })
    }
    // Save individual test case results
    const testCaseResults = detailedTestCasesResults.map((result) => ({
        submissionId: submission.id,
        testCase: result.testCase,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
    }));

    await db.testCaseResult.createMany({
        data: testCaseResults
    });

    const submissionWithTestCase = await db.submission.findUnique({
        where: {
            id: submission.id
        },
        include: {
            testCases: true
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200, 
            submissionWithTestCase,
            "Execution successful"
        )
    );
});

export { executeCode };
