import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getVideoById, publishVideo, updateVideo } from "../controllers/video.controller.js";

const router = Router()

// upload video route
router.route("/publish-video").post(verifyJWT,upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    },
    {
        name:"videoFile",
        maxCount:1
    }
]),
publishVideo
)

// get single video

router.route("/:videoId").get(verifyJWT, getVideoById)
router.route("/update-video/:videoId").patch(verifyJWT, updateVideo)
export default router;