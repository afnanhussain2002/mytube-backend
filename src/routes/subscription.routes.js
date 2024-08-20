import { Router } from "express";
import { toggleSubscription } from "../controllers/subscription.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/channel/:id").post(verifyJWT,toggleSubscription)

export default router