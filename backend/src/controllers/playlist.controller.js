import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const getAllListDetails = asyncHandler(async(req, res) => {
    const playlist = await db.playlist.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            problems: {
                include: {
                    problem: true
                }
            }
        }
    });
    if(!playlist){
        throw new ApiError(500, "Error in fetching all playlist details")
    }
    return res.status(200).json(
        new ApiResponse(200, playlist, "Playlist fetched successfully")
    );
});

const getPlayListDetails = asyncHandler(async(req, res) => {

});

const createPlaylist = asyncHandler(async(req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    const playlist = await db.playlist.create({
        data: {
            name,
            description,
            userId
        }
    });
    if(!playlist){
        throw new ApiError(500, "Error in creating new playlist")
    }
    res.status(200).json(
        new ApiResponse(200, playlist, "Playlist created successfully")
    );
});

const addProblemToPlaylist = asyncHandler(async(req, res) => {

});

const deletePlaylist = asyncHandler(async(req, res) => {

});

const removeProblemFromPlaylist = asyncHandler(async(req, res) => {

});

export {
    getAllListDetails,
    getPlayListDetails,
    createPlaylist,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist
}