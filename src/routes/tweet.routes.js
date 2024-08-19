import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, getUserTweet } from "../controllers/tweet.controller.js";

const router = Router()

router.route("/create-tweet").post(verifyJWT, createTweet)
router.route("/:userId").get(getUserTweet)

export default router;