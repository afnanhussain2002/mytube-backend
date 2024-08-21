import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { toggleVideoLike } from "../controllers/like.controller";

const router = Router()

router.route("/video-like").post(verifyJWT, toggleVideoLike)

export default router