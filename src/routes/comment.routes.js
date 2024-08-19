import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";
import { Comment } from "../models/comment.model.js";

const router = Router()

router.route("/add-comment").post(verifyJWT, addComment)
router.route("/update-comment/:id").patch(verifyJWT,verifyOwner(Comment), updateComment)
router.route("/delete-comment/:id").delete(verifyJWT,verifyOwner(Comment), deleteComment)

export default router