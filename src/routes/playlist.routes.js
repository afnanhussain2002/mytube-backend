import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, getUserPlaylist } from "../controllers/playlist.controller.js";

const router = Router()

router.route("/create-playlist").post(verifyJWT, createPlaylist)
router.route("/get-playlist/:userId").get(verifyJWT, getUserPlaylist)
router.route("/get-video/:playlistId/:videoId").post(verifyJWT, addVideoToPlaylist)

export default router;