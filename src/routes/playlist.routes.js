import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createPlaylist } from "../controllers/playlist.controller";

const router = Router()

router.route("/create-playlist").post(verifyJWT, createPlaylist)

export default router;