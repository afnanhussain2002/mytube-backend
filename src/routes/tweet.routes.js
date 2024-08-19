import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweet,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";

const router = Router();

router.route("/create-tweet").post(verifyJWT, createTweet);
router.route("/:userId").get(getUserTweet);
router.route("/update/:tweetId").patch(verifyJWT,updateTweet);
router.route("/delete/:tweetId").delete(verifyJWT,deleteTweet);

export default router;
