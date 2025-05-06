import express from "express"
import { isUserValidAuthMiddleware } from "../middlewares/auth.middleware.js";
import {
    getAllListDetails,
    getPlayListDetails,
    createPlaylist,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemFromPlaylist
}from "../controllers/playlist.controller.js"

const playlistRouter = express.Router();

playlistRouter.get("/", isUserValidAuthMiddleware, getAllListDetails);

playlistRouter.get("/:playlistId", isUserValidAuthMiddleware, getPlayListDetails);

playlistRouter.post("/create-playlist", isUserValidAuthMiddleware, createPlaylist);

playlistRouter.post("/add-problem/:playlistId", isUserValidAuthMiddleware, addProblemToPlaylist);

playlistRouter.delete("/delete-playlist/:playlistId", isUserValidAuthMiddleware, deletePlaylist);

playlistRouter.delete("/remove-problem/:playlistId", isUserValidAuthMiddleware, removeProblemFromPlaylist)

export default playlistRouter;