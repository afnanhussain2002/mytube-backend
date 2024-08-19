import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createTweet } from "../controllers/tweet.controller";

const router = Router()

router.route("/create-tweet").post(verifyJWT, createTweet)