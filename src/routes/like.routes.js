import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router()

router.route("/video-like/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/comment-like/:commentId").post(verifyJWT, toggleCommentLike)
router.route("/tweet-like/:tweetId").post(verifyJWT, toggleTweetLike)

export default router