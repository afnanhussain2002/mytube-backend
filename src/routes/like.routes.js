import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { toggleVideoLike } from "../controllers/like.controller";

const router = Router()

router.route("/video-like/:videoId").post(verifyJWT, toggleVideoLike)

export default router