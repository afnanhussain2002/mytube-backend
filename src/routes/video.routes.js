import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, getVideoByUserId, publishVideo, togglePublishStatus, updateVideoDetails } from "../controllers/video.controller.js";
import { verifyOwner } from "../middlewares/owner.middleware.js";
import { Video } from "../models/video.model.js";

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

router.route("/").get(getAllVideos)
router.route("/:userId").get(verifyJWT, getVideoByUserId)

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

router.route("/delete/:id").delete(verifyJWT,verifyOwner(Video), deleteVideo)
router.route("/change-publish-status/:id").patch(verifyJWT,verifyOwner(Video), togglePublishStatus)

export default router;