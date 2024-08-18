import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getVideoById, publishVideo, togglePublishStatus, updateVideoDetails } from "../controllers/video.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";

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
router.route("/update-video-details/:videoId").patch(verifyJWT, upload.fields([
    {
        name:"thumbnail",
        maxCount:1
    },
    {
        name:"videoFile",
        maxCount:1
    }
]), updateVideoDetails)

router.route("/delete/:videoId").delete(verifyJWT,verifyOwner, deleteVideo)
router.route("/change-publish-status/:videoId").patch(verifyJWT,verifyOwner, togglePublishStatus)

export default router;