import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../libs/db.js";
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from "../utils/api-response.js"

const createProblem = asyncHandler(async (req, res) => {

});

const getAllProblems = asyncHandler(async (req, res) => {

});

const getProblemById = asyncHandler(async (req, res) => {

});

const updateProblem = asyncHandler(async (req, res) => {

});

const deleteProblem = asyncHandler(async (req, res) => {

});

const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {

});

export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getAllProblemsSolvedByUser,
}