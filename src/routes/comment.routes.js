import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addComment } from "../controllers/comment.controller";

const router = Router()

router.route("/add-comment").post(verifyJWT, addComment)

export default router