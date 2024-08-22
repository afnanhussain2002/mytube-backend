import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getUserPlaylist, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";
import { Playlist } from "../models/playlist.model.js";

const router = Router()

router.route("/create-playlist").post(verifyJWT, createPlaylist)
router.route("/get-playlist/:userId").get(verifyJWT, getUserPlaylist)
router.route("/add-video/:playlistId/:videoId").post(verifyJWT, addVideoToPlaylist)
router.route("/remove-video/:playlistId/:videoId").post(verifyJWT, removeVideoFromPlaylist)
router.route("/update-playlist/:id").patch(verifyJWT, verifyOwner(Playlist), updatePlaylist)
router.route("/delete-playlist/:id").delete(verifyJWT, verifyOwner(Playlist), deletePlaylist)

export default router;