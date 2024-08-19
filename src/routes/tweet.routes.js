import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweet,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";
import { Tweet } from "../models/tweet.model.js";

const router = Router();

router.route("/create-tweet").post(verifyJWT, createTweet);
router.route("/:userId").get(getUserTweet);
router.route("/update/:id").patch(verifyJWT, verifyOwner(Tweet),updateTweet);
router.route("/delete/:id").delete(verifyJWT,verifyOwner(Tweet),deleteTweet);

export default router;
