import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router()

router.route("/video-like/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/comment-like/:commentId").post(verifyJWT, toggleCommentLike)
router.route("/tweet-like/:tweetId").post(verifyJWT, toggleTweetLike)
router.route("/liked-videos/:likedById").get(verifyJWT, getLikedVideos)

export default router