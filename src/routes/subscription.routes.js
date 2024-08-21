import { Router } from "express";
import { getUserChannelSubscriber, toggleSubscription } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/channel/:channelId").post(verifyJWT,toggleSubscription)
router.route("/channel-subscriber/:channelId").get(verifyJWT,getUserChannelSubscriber)

export default router