import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleCommentLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router()

router.route("/video-like/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/comment-like/:commentId").post(verifyJWT, toggleCommentLike)

export default router