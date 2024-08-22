import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, getUserPlaylist, removeVideoFromPlaylist } from "../controllers/playlist.controller.js";

const router = Router()

router.route("/create-playlist").post(verifyJWT, createPlaylist)
router.route("/get-playlist/:userId").get(verifyJWT, getUserPlaylist)
router.route("/get-video/:playlistId/:videoId").post(verifyJWT, addVideoToPlaylist)
router.route("/remove-video/:playlistId/:videoId").post(verifyJWT, removeVideoFromPlaylist)

export default router;